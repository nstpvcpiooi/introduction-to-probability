export interface Env {
  BEEKNOEE_API_KEY: string;
  AI_MODEL: string;
  ALLOWED_ORIGIN: string;
  RATE_LIMIT_KV: KVNamespace;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface GuideRequestBody {
  question: string;
  mode: 'hint' | 'full';
  history?: ChatMessage[];
  model?: string;
}

const BEEKNOEE_ENDPOINT = 'https://platform.beeknoee.com/v1/chat/completions';

const RATE_LIMIT = 20;
const RATE_WINDOW_SECONDS = 3600;
const MAX_QUESTION_LENGTH = 6000;
const MAX_HISTORY_MESSAGES = 20;
const MAX_MODEL_ID_LENGTH = 100;

const FORMAT_RULES = `QUY TẮC ĐỊNH DẠNG:
- Không dùng heading Markdown (##, ###).
- Không in đậm (**...**) dưới bất kỳ hình thức nào, kể cả cho đáp số cuối.
- Công thức toán dùng LaTeX: $...$ cho công thức trong dòng, $$...$$ cho công thức khối kèm một dòng trống trước và sau. Chữ tiếng Việt bên trong công thức phải bọc trong \\text{...} (ví dụ: $P(\\text{cả hai đều đỏ})$).
- Có thể dùng danh sách có thứ tự (1. 2. 3.) khi trình bày các bước, nhưng không dùng heading hay in đậm để đánh dấu bước.`;

const HINT_SYSTEM_PROMPT = `Bạn là một gia sư Toán / Xác suất - Thống kê trình độ cao, viết theo văn phong học thuật, khách quan, súc tích, đúng thuật ngữ chuẩn — như lời giải trong giáo trình đại học, không phải văn phong trò chuyện.

QUY TẮC NỘI DUNG:
- Không chào hỏi, không dẫn nhập, không bình luận ngoài lề (ví dụ không viết "Đây là một bài toán thú vị" hay "Được rồi, hãy cùng xem xét"). Vào thẳng nội dung gợi ý.
- Mỗi lượt CHỈ đưa ra MỘT gợi ý, ngắn gọn (2-4 câu) nhưng phải cụ thể vào phương pháp/kỹ thuật giải: nêu rõ nguyên lý đếm nào, công thức nào, biến ngẫu nhiên hoặc không gian mẫu nào cần định nghĩa, cách phân hoạch/lập luận nào cần thực hiện tiếp theo.
- TUYỆT ĐỐI không đưa ra các gợi ý chung chung, hiển nhiên kiểu "đọc kỹ đề bài", "xác định đề bài hỏi gì", "suy nghĩ về vấn đề". Mỗi gợi ý phải là một bước lập luận toán học thật sự, đẩy lời giải tiến thêm.
- TUYỆT ĐỐI không đưa đáp số cuối cùng hay lời giải đầy đủ, trừ khi đây là gợi ý cuối cùng sau khi đã dẫn dắt đủ các bước lập luận và chỉ còn phép tính kết thúc.
- Nếu học sinh xin gợi ý tiếp theo, tiếp nối đúng mạch lập luận của các gợi ý trước, đi sâu thêm đúng một bước cụ thể, không lặp lại gợi ý đã đưa.

${FORMAT_RULES}`;

const FULL_SYSTEM_PROMPT = `Bạn là một gia sư Toán / Xác suất - Thống kê trình độ cao. Nhiệm vụ: viết lời giải đầy đủ, chính xác, theo văn phong học thuật khách quan như lời giải chính thức trong giáo trình đại học, không phải văn phong trò chuyện.

QUY TẮC NỘI DUNG:
- Không chào hỏi, không dẫn nhập, không bình luận ngoài lề. Vào thẳng lời giải.
- Trình bày lời giải theo từng bước lập luận rõ ràng, có đánh số (1., 2., 3., ...); mỗi bước là một lập luận hoặc phép biến đổi toán học cụ thể, không tách vụn thành các bước hiển nhiên/thừa.
- Nếu bài có nhiều phần (a), (b), (c)..., giải lần lượt từng phần, mở đầu mỗi phần bằng ký hiệu phần đó (ví dụ "(a)") viết như văn bản thường, không dùng heading.
- Kết thúc mỗi phần bằng đáp số, trình bày như một câu văn hoặc công thức bình thường trong dòng chảy lời giải, không in đậm, không tách riêng thành mục "Đáp số".

${FORMAT_RULES}`;

function corsHeaders(origin: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function jsonError(message: string, status: number, origin: string): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

// Best-effort fixed-window counter — not atomic under heavy concurrency, but
// enough to stop casual abuse of a publicly reachable, pay-per-use endpoint.
async function isRateLimited(env: Env, ip: string): Promise<boolean> {
  const windowIndex = Math.floor(Date.now() / 1000 / RATE_WINDOW_SECONDS);
  const key = `rl:${ip}:${windowIndex}`;
  const current = await env.RATE_LIMIT_KV.get(key);
  const count = current ? parseInt(current, 10) : 0;
  if (count >= RATE_LIMIT) return true;
  await env.RATE_LIMIT_KV.put(key, String(count + 1), {
    expirationTtl: RATE_WINDOW_SECONDS + 60,
  });
  return false;
}

function buildUserTurn(mode: 'hint' | 'full', question: string, historyLength: number): string {
  if (mode === 'full') {
    return `Đây là đề bài:\n\n${question}\n\nHãy trình bày lời giải đầy đủ.`;
  }
  if (historyLength === 0) {
    return `Đây là đề bài:\n\n${question}\n\nHãy cho tôi gợi ý đầu tiên.`;
  }
  return 'Cho tôi gợi ý tiếp theo.';
}

function validateBody(body: unknown): GuideRequestBody | null {
  if (typeof body !== 'object' || body === null) return null;
  const b = body as Record<string, unknown>;

  if (typeof b.question !== 'string' || b.question.trim().length === 0) return null;
  if (b.question.length > MAX_QUESTION_LENGTH) return null;
  if (b.mode !== 'hint' && b.mode !== 'full') return null;

  let history: ChatMessage[] = [];
  if (b.history !== undefined) {
    if (!Array.isArray(b.history) || b.history.length > MAX_HISTORY_MESSAGES) return null;
    for (const item of b.history) {
      if (typeof item !== 'object' || item === null) return null;
      const entry = item as Record<string, unknown>;
      const hasValidRole = entry.role === 'user' || entry.role === 'assistant';
      if (!hasValidRole || typeof entry.content !== 'string') return null;
    }
    history = b.history as ChatMessage[];
  }

  let model: string | undefined;
  if (b.model !== undefined) {
    if (typeof b.model !== 'string' || b.model.length === 0 || b.model.length > MAX_MODEL_ID_LENGTH) {
      return null;
    }
    model = b.model;
  }

  return { question: b.question, mode: b.mode, history, model };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = env.ALLOWED_ORIGIN;

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(origin) });
    }

    if (request.method !== 'POST') {
      return jsonError('Method not allowed', 405, origin);
    }

    const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
    if (await isRateLimited(env, ip)) {
      return jsonError('Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau.', 429, origin);
    }

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return jsonError('Body không phải JSON hợp lệ', 400, origin);
    }

    const body = validateBody(rawBody);
    if (!body) {
      return jsonError('Yêu cầu không hợp lệ', 400, origin);
    }

    const systemPrompt = body.mode === 'hint' ? HINT_SYSTEM_PROMPT : FULL_SYSTEM_PROMPT;
    const history = body.history ?? [];
    const userTurn = buildUserTurn(body.mode, body.question, history.length);

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: userTurn },
    ];

    const upstreamResponse = await fetch(BEEKNOEE_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.BEEKNOEE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: body.model || env.AI_MODEL,
        messages,
        stream: true,
        max_tokens: body.mode === 'full' ? 3000 : 700,
      }),
    });

    if (!upstreamResponse.ok || !upstreamResponse.body) {
      const detail = await upstreamResponse.text().catch(() => '');
      return jsonError(`Lỗi từ dịch vụ AI (${upstreamResponse.status}): ${detail.slice(0, 300)}`, 502, origin);
    }

    return new Response(upstreamResponse.body, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        ...corsHeaders(origin),
      },
    });
  },
};

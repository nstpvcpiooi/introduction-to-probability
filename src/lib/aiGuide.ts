export interface AIChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface GuideRequestPayload {
  question: string;
  mode: 'hint' | 'full';
  history: AIChatMessage[];
  model: string;
}

export class GuideRequestError extends Error {}

/**
 * Reconstructs the exact user-turn text the worker builds server-side
 * (`buildUserTurn` in ai-worker/src/index.ts) so the client-side history it
 * accumulates for hint mode matches what the model actually saw. Keep these
 * two functions in sync — the worker never echoes the text back over SSE.
 */
export function describeUserTurn(mode: 'hint' | 'full', question: string, historyLength: number): string {
  if (mode === 'full') {
    return `Đây là đề bài:\n\n${question}\n\nHãy trình bày lời giải đầy đủ.`;
  }
  if (historyLength === 0) {
    return `Đây là đề bài:\n\n${question}\n\nHãy cho tôi gợi ý đầu tiên.`;
  }
  return 'Cho tôi gợi ý tiếp theo.';
}

const ENDPOINT = import.meta.env.VITE_AI_GUIDE_ENDPOINT as string | undefined;

/**
 * Streams an AI guide response from the ai-worker proxy. The proxy forwards
 * an OpenAI-compatible SSE stream (`data: {...}\n\n`, terminated by
 * `data: [DONE]`) straight from Beeknoee, so this parses that same format.
 */
export async function* streamGuide(payload: GuideRequestPayload): AsyncGenerator<string> {
  if (!ENDPOINT) {
    throw new GuideRequestError('Tính năng hướng dẫn AI chưa được cấu hình (thiếu VITE_AI_GUIDE_ENDPOINT).');
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok || !response.body) {
    let message = `Yêu cầu thất bại (mã ${response.status}).`;
    try {
      const data = await response.json();
      if (typeof data?.error === 'string') message = data.error;
    } catch {
      // Body wasn't JSON — keep the default message.
    }
    throw new GuideRequestError(message);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) continue;
      const data = trimmed.slice('data:'.length).trim();
      if (data === '[DONE]') return;

      try {
        const parsed = JSON.parse(data);
        const delta = parsed?.choices?.[0]?.delta?.content;
        if (typeof delta === 'string' && delta.length > 0) yield delta;
      } catch {
        // Skip a malformed/partial chunk rather than aborting the stream.
      }
    }
  }
}

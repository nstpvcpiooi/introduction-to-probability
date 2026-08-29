import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import { Loader2, Lightbulb, BookOpenCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useAIModel } from '@/lib/aiModelStore';
import { streamGuide, describeUserTurn, type AIChatMessage } from '@/lib/aiGuide';

interface ExerciseAIGuideProps {
  exerciseId: string;
  question: string;
}

type Status = 'idle' | 'busy' | 'error';
type Mode = 'hint' | 'full' | null;

// AI output is rendered as Markdown/LaTeX only — never with rehype-raw, so
// the model can't inject live HTML/script into the page.
function AIMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>
      {content}
    </ReactMarkdown>
  );
}

function ThinkingIndicator({ variant }: { variant: 'hint' | 'full' }) {
  return (
    <span className={`ai-guide-thinking ai-guide-thinking-${variant}`}>
      Đang suy nghĩ
      <span className="ai-guide-thinking-dots">
        <span />
        <span />
        <span />
      </span>
    </span>
  );
}

export function ExerciseAIGuide({ exerciseId, question }: ExerciseAIGuideProps) {
  const model = useAIModel();
  const [mode, setMode] = useState<Mode>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [hints, setHints] = useState<string[]>([]);
  const [streamingHint, setStreamingHint] = useState<string | null>(null);
  const [fullText, setFullText] = useState('');
  const historyRef = useRef<AIChatMessage[]>([]);

  async function requestHint() {
    setMode('hint');
    setStatus('busy');
    setStreamingHint('');
    const userTurn = describeUserTurn('hint', question, historyRef.current.length);

    try {
      let acc = '';
      for await (const chunk of streamGuide({ question, mode: 'hint', history: historyRef.current, model })) {
        acc += chunk;
        setStreamingHint(acc);
      }
      historyRef.current = [
        ...historyRef.current,
        { role: 'user', content: userTurn },
        { role: 'assistant', content: acc },
      ];
      setHints(prev => [...prev, acc]);
      setStreamingHint(null);
      setStatus('idle');
    } catch (err) {
      setStreamingHint(null);
      setStatus('error');
      toast.error(err instanceof Error ? err.message : 'Không thể tải gợi ý. Vui lòng thử lại.');
    }
  }

  async function requestFull() {
    setMode('full');
    setStatus('busy');
    setFullText('');

    try {
      let acc = '';
      for await (const chunk of streamGuide({ question, mode: 'full', history: [], model })) {
        acc += chunk;
        setFullText(acc);
      }
      setStatus('idle');
    } catch (err) {
      setStatus('error');
      toast.error(err instanceof Error ? err.message : 'Không thể tải lời giải. Vui lòng thử lại.');
    }
  }

  const showHintPanel = mode === 'hint' && (hints.length > 0 || streamingHint !== null);
  const hintBusy = status === 'busy' && mode === 'hint';
  const fullBusy = status === 'busy' && mode === 'full';

  return (
    <div className="ai-guide" data-exercise-id={exerciseId}>
      <div className="ai-guide-actions">
        <button type="button" className="ai-guide-btn ai-guide-btn-hint" disabled={status === 'busy'} onClick={requestHint}>
          {hintBusy ? <Loader2 size={14} className="animate-spin" /> : <Lightbulb size={14} />}
          {hints.length === 0 ? 'Gợi ý từng bước' : 'Gợi ý tiếp theo'}
        </button>
        <button type="button" className="ai-guide-btn ai-guide-btn-full" disabled={status === 'busy'} onClick={requestFull}>
          {fullBusy ? <Loader2 size={14} className="animate-spin" /> : <BookOpenCheck size={14} />}
          Xem lời giải đầy đủ
        </button>
      </div>

      {showHintPanel && (
        <div className="ai-guide-panel">
          <ol className="solution-steps">
            {hints.map((hint, i) => (
              <li className="solution-step" key={i}>
                <span className="solution-step-num">{i + 1}</span>
                <div className="solution-step-body">
                  <AIMarkdown content={hint} />
                </div>
              </li>
            ))}
            {streamingHint !== null && (
              <li className="solution-step">
                <span className="solution-step-num">{hints.length + 1}</span>
                <div className="solution-step-body">
                  {streamingHint === '' ? (
                    <ThinkingIndicator variant="hint" />
                  ) : (
                    <AIMarkdown content={streamingHint} />
                  )}
                </div>
              </li>
            )}
          </ol>
        </div>
      )}

      {mode === 'full' && (fullText.length > 0 || fullBusy) && (
        <div className="ai-guide-panel">
          {fullText.length === 0 ? (
            <ThinkingIndicator variant="full" />
          ) : (
            <AIMarkdown content={fullText} />
          )}
        </div>
      )}
    </div>
  );
}

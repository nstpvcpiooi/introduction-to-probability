import { useState } from 'react';
import { Settings, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { PRESET_MODELS, setAIModel, useAIModel } from '@/lib/aiModelStore';

const CUSTOM_VALUE = '__custom__';

export function AISettingsDialog() {
  const currentModel = useAIModel();
  const isPreset = PRESET_MODELS.some(m => m.id === currentModel);

  const [selection, setSelection] = useState<string>(isPreset ? currentModel : CUSTOM_VALUE);
  const [customDraft, setCustomDraft] = useState(isPreset ? '' : currentModel);

  function handleRadioChange(value: string) {
    setSelection(value);
    if (value === CUSTOM_VALUE) {
      if (customDraft.trim()) setAIModel(customDraft);
    } else {
      setAIModel(value);
    }
  }

  function handleCustomChange(value: string) {
    setCustomDraft(value);
    setSelection(CUSTOM_VALUE);
    if (value.trim()) setAIModel(value);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="ai-settings-trigger" aria-label="Cài đặt model AI hướng dẫn giải" title="Cài đặt model">
          <Settings size={15} />
          <span className="ai-settings-trigger-label">Cài đặt model</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cài đặt model AI</DialogTitle>
          <DialogDescription>
            Chọn model AI dùng để sinh gợi ý và lời giải cho các bài tập.
          </DialogDescription>
        </DialogHeader>

        <RadioGroup value={selection} onValueChange={handleRadioChange} className="flex flex-col gap-2">
          {PRESET_MODELS.map(m => {
            const active = selection === m.id;
            return (
              <label
                key={m.id}
                htmlFor={`ai-model-${m.id}`}
                className={cn('ai-settings-option', active && 'is-active')}
              >
                <RadioGroupItem value={m.id} id={`ai-model-${m.id}`} className="mt-0.5" />
                <span className="ai-settings-option-body">
                  <span className="ai-settings-option-label">{m.label}</span>
                  <span className="ai-settings-option-hint">{m.hint}</span>
                </span>
                {active && <Check size={16} className="ai-settings-option-check" />}
              </label>
            );
          })}

          <label
            htmlFor="ai-model-custom"
            className={cn('ai-settings-option', selection === CUSTOM_VALUE && 'is-active')}
          >
            <RadioGroupItem value={CUSTOM_VALUE} id="ai-model-custom" className="mt-0.5" />
            <span className="ai-settings-option-body">
              <span className="ai-settings-option-label">Khác...</span>
              <Input
                placeholder="ví dụ: deepseek/deepseek-v3.2"
                value={customDraft}
                onChange={e => handleCustomChange(e.target.value)}
                onClick={e => e.stopPropagation()}
              />
            </span>
          </label>
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
}

import { useSyncExternalStore } from 'react';

export interface ModelOption {
  id: string;
  label: string;
  hint: string;
}

export const PRESET_MODELS: ModelOption[] = [
  { id: 'bee/gemini-3.6-flash', label: 'Gemini 3.6 Flash', hint: 'Mặc định — nhanh' },
  { id: 'gemini-3.1-pro-preview', label: 'Gemini 3.1 Pro (preview)', hint: 'Mạnh hơn, chậm hơn' },
  { id: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6', hint: 'Lý luận toán tốt' },
];

export const DEFAULT_MODEL = PRESET_MODELS[0].id;

const STORAGE_KEY = 'ai-guide-model';

let currentModel = readFromStorage();
const listeners = new Set<() => void>();

function readFromStorage(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_MODEL;
  } catch {
    return DEFAULT_MODEL;
  }
}

export function getAIModel(): string {
  return currentModel;
}

export function setAIModel(id: string): void {
  const trimmed = id.trim();
  if (!trimmed || trimmed === currentModel) return;
  currentModel = trimmed;
  try {
    localStorage.setItem(STORAGE_KEY, trimmed);
  } catch {
    // localStorage unavailable (private mode, etc.) — keep the in-memory value only.
  }
  listeners.forEach(listener => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useAIModel(): string {
  return useSyncExternalStore(subscribe, getAIModel);
}

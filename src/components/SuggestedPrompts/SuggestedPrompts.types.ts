import { SuggestedPrompt } from "@/types/assistant";

export interface SuggestedPromptsProps {
  prompts: SuggestedPrompt[];
  onSelectPrompt: (prompt: string) => void;
  className?: string;
}

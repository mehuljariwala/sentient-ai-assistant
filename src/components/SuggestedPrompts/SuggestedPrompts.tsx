"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SuggestedPromptsProps } from "./SuggestedPrompts.types";
import { ANIMATION_CONFIG } from "./SuggestedPrompts.data";
import { suggestedPromptsStyles as styles } from "./SuggestedPrompts.styles";

export function SuggestedPrompts({
  prompts,
  onSelectPrompt,
  className,
}: SuggestedPromptsProps) {
  return (
    <div className={cn(styles.container, className)}>
      {prompts.map((prompt, index) => (
        <motion.button
          key={prompt.id}
          initial={ANIMATION_CONFIG.initial}
          animate={ANIMATION_CONFIG.animate}
          transition={{
            delay: index * ANIMATION_CONFIG.transitionDelayMultiplier,
          }}
          onClick={() => onSelectPrompt(prompt.text)}
          className={styles.promptButton}
        >
          {prompt.text}
        </motion.button>
      ))}
    </div>
  );
}

"use client";

import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileHeaderProps } from "./MobileHeader.types";
import { ARIA_LABELS, ICON_SIZE, BUTTON_CONFIG } from "./MobileHeader.data";
import { mobileHeaderStyles as styles } from "./MobileHeader.styles";

export function MobileHeader({ onNewChat, className }: MobileHeaderProps) {
  return (
    <header className={cn(styles.header, className)}>
      {/* Plus button */}
      <button
        onClick={onNewChat}
        className={styles.plusButton}
        aria-label={ARIA_LABELS.newConversation}
      >
        <Plus className={ICON_SIZE.plus} />
      </button>

      {/* Status bar icons and S button */}
      <div className={styles.rightSection}>
        {/* S button */}
        <button
          className={styles.accountButton}
          aria-label={ARIA_LABELS.account}
        >
          {BUTTON_CONFIG.accountButton.text}
        </button>
      </div>
    </header>
  );
}

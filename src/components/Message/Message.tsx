"use client";

import { motion } from "framer-motion";
import { Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { useState } from "react";
import { MessageProps } from "./Message.types";
import {
  MESSAGE_DEFAULTS,
  AVATAR_SIZES,
  LOGO_SIZES,
  ANIMATION_CONFIG,
  ACCESSIBILITY_LABELS,
} from "./Message.data";
import {
  messageContainerClasses,
  avatarClasses,
  contentClasses,
  actionClasses,
  iconClasses,
  logoClasses,
} from "./Message.styles";

export function Message({ message, isLast }: MessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), MESSAGE_DEFAULTS.COPIED_TIMEOUT);
  };

  return (
    <motion.div
      {...ANIMATION_CONFIG.MESSAGE}
      className={cn(
        messageContainerClasses.base,
        isUser
          ? messageContainerClasses.user
          : messageContainerClasses.assistant
      )}
    >
      {/* Avatar */}
      <div className={avatarClasses.container}>
        {isUser ? (
          <div
            className={cn(
              avatarClasses.userAvatar,
              avatarClasses.userAvatarMobile,
              avatarClasses.userAvatarDesktop
            )}
          >
            <span className={avatarClasses.userAvatarText}>
              {MESSAGE_DEFAULTS.USER_AVATAR_TEXT}
            </span>
          </div>
        ) : (
          <Logo
            size={LOGO_SIZES.AVATAR}
            animate={message.isLoading}
            className={logoClasses.avatar}
          />
        )}
      </div>

      {/* Content */}
      <div className={contentClasses.container}>
        {/* Role label */}
        <div className={contentClasses.roleLabel}>
          {isUser
            ? MESSAGE_DEFAULTS.USER_LABEL
            : MESSAGE_DEFAULTS.ASSISTANT_LABEL}
        </div>

        {/* Message content */}
        {message.isLoading ? (
          <div className={contentClasses.loadingContainer}>
            <Logo
              size={LOGO_SIZES.LOADING}
              animate
              className={logoClasses.loading}
            />
            <span className={contentClasses.loadingText}>
              {message.content || MESSAGE_DEFAULTS.LOADING_TEXT}
            </span>
          </div>
        ) : (
          <div className={contentClasses.messageText}>{message.content}</div>
        )}

        {/* Actions */}
        {!isUser && !message.isLoading && isLast && (
          <div className={actionClasses.container}>
            <button
              onClick={handleCopy}
              className={actionClasses.button}
              aria-label={ACCESSIBILITY_LABELS.COPY}
            >
              {copied ? (
                <span className={actionClasses.copiedText}>
                  {MESSAGE_DEFAULTS.COPIED_TEXT}
                </span>
              ) : (
                <Copy className={iconClasses.base} />
              )}
            </button>
            <button
              className={actionClasses.button}
              aria-label={ACCESSIBILITY_LABELS.LIKE}
            >
              <ThumbsUp className={iconClasses.base} />
            </button>
            <button
              className={actionClasses.button}
              aria-label={ACCESSIBILITY_LABELS.DISLIKE}
            >
              <ThumbsDown className={iconClasses.base} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Message;

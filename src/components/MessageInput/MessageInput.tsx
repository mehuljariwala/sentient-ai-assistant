"use client";

import { useState, useRef, KeyboardEvent, useEffect } from "react";
import { Send, Paperclip, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MessageInputProps, TimingMode } from "./MessageInput.types";
import {
  MESSAGE_INPUT_DEFAULTS,
  TEXTAREA_CONFIG,
  TIMING_MODES,
  ANIMATION_CONFIG,
  ICON_SIZES,
  ACCESSIBILITY_LABELS,
} from "./MessageInput.data";
import {
  containerBaseClasses,
  containerFocusClasses,
  textareaClasses,
  buttonClasses,
  timingToggleClasses,
  sendButtonClasses,
  iconClasses,
} from "./MessageInput.styles";

export function MessageInput({
  onSendMessage,
  disabled,
  placeholder = MESSAGE_INPUT_DEFAULTS.PLACEHOLDER,
  className,
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [timingMode, setTimingMode] = useState<TimingMode>(
    MESSAGE_INPUT_DEFAULTS.TIMING_MODE
  );
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(
        textarea.scrollHeight,
        parseInt(TEXTAREA_CONFIG.MAX_HEIGHT)
      )}px`;
    }
  };

  // Focus management for accessibility
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && textareaRef.current) {
        textareaRef.current.blur();
      }
    };

    document.addEventListener("keydown", handleEscape as any);
    return () => document.removeEventListener("keydown", handleEscape as any);
  }, []);

  return (
    <motion.div
      className={cn(
        containerBaseClasses,
        isFocused && containerFocusClasses,
        className
      )}
      {...ANIMATION_CONFIG.CONTAINER}
    >
      {/* First row - Message input with mobile plus icon */}
      <div className="flex items-start gap-3">
        {/* Plus icon on mobile with micro-interaction */}
        <motion.button
          type="button"
          className={cn(buttonClasses.base, buttonClasses.mobile)}
          aria-label={ACCESSIBILITY_LABELS.ADD_ATTACHMENT}
          disabled={disabled}
          {...ANIMATION_CONFIG.BUTTON_INTERACTION}
        >
          <Plus className={iconClasses.attachment} />
        </motion.button>

        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            adjustTextareaHeight();
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          rows={TEXTAREA_CONFIG.ROWS}
          className={textareaClasses}
          style={{
            minHeight: TEXTAREA_CONFIG.MIN_HEIGHT,
            maxHeight: TEXTAREA_CONFIG.MAX_HEIGHT,
          }}
          aria-label={ACCESSIBILITY_LABELS.MESSAGE_INPUT}
          aria-describedby="timing-mode"
        />
      </div>

      {/* Second row - Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Attach button - hidden on mobile with hover effect */}
          <motion.button
            type="button"
            className={cn(buttonClasses.base, buttonClasses.desktop)}
            aria-label={ACCESSIBILITY_LABELS.ATTACH_FILE}
            disabled={disabled}
            {...ANIMATION_CONFIG.BUTTON_ROTATE}
          >
            <Paperclip className={iconClasses.attachment} />
          </motion.button>

          {/* Timer/Preview toggle with enhanced animation */}
          <div
            className={timingToggleClasses.container}
            role="radiogroup"
            aria-label={ACCESSIBILITY_LABELS.TIMING_MODE}
            id="timing-mode"
          >
            {/* Animated background */}
            <motion.div
              className={timingToggleClasses.background}
              animate={{
                x: timingMode === TIMING_MODES.PREVIEW.value ? "100%" : "0%",
              }}
              {...ANIMATION_CONFIG.TOGGLE_BACKGROUND}
            />

            <button
              type="button"
              onClick={() => setTimingMode(TIMING_MODES.MINI.value)}
              className={cn(
                timingToggleClasses.button,
                timingMode === TIMING_MODES.MINI.value
                  ? timingToggleClasses.active
                  : timingToggleClasses.inactive
              )}
              disabled={disabled}
              role="radio"
              aria-checked={timingMode === TIMING_MODES.MINI.value}
              aria-label={TIMING_MODES.MINI.description}
            >
              {TIMING_MODES.MINI.label}
            </button>
            <button
              type="button"
              onClick={() => setTimingMode(TIMING_MODES.PREVIEW.value)}
              className={cn(
                timingToggleClasses.button,
                timingMode === TIMING_MODES.PREVIEW.value
                  ? timingToggleClasses.active
                  : timingToggleClasses.inactive
              )}
              disabled={disabled}
              role="radio"
              aria-checked={timingMode === TIMING_MODES.PREVIEW.value}
              aria-label={TIMING_MODES.PREVIEW.description}
            >
              {TIMING_MODES.PREVIEW.label}
            </button>
          </div>
        </div>

        {/* Send button with animation */}
        <AnimatePresence mode="wait">
          <motion.button
            key={message.trim() ? "active" : "inactive"}
            type="button"
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            className={cn(
              sendButtonClasses.base,
              message.trim() && !disabled
                ? sendButtonClasses.active
                : sendButtonClasses.disabled
            )}
            aria-label={ACCESSIBILITY_LABELS.SEND_MESSAGE}
            {...ANIMATION_CONFIG.SEND_BUTTON}
            whileHover={
              message.trim() && !disabled
                ? ANIMATION_CONFIG.SEND_BUTTON.whileHover
                : {}
            }
            whileTap={
              message.trim() && !disabled
                ? ANIMATION_CONFIG.SEND_BUTTON.whileTap
                : {}
            }
          >
            <Send className={iconClasses.send} />
          </motion.button>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default MessageInput;

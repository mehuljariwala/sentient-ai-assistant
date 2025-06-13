import { TimingMode } from "./MessageInput.types";

export const MESSAGE_INPUT_DEFAULTS = {
  PLACEHOLDER: "Ask me anything...",
  TIMING_MODE: "mini" as TimingMode,
};

export const TEXTAREA_CONFIG = {
  MIN_HEIGHT: "32px",
  MAX_HEIGHT: "200px",
  ROWS: 1,
};

export const TIMING_MODES = {
  MINI: {
    value: "mini" as TimingMode,
    label: "4s - mini",
    description: "4 second mini response",
  },
  PREVIEW: {
    value: "preview" as TimingMode,
    label: "s1 - preview",
    description: "S1 preview response",
  },
};

export const ANIMATION_CONFIG = {
  CONTAINER: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  },
  BUTTON_INTERACTION: {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },
  BUTTON_ROTATE: {
    whileHover: { scale: 1.1, rotate: 15 },
    whileTap: { scale: 0.9 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },
  TOGGLE_BACKGROUND: {
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  },
  SEND_BUTTON: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },
};

export const ICON_SIZES = {
  MOBILE: {
    width: 5,
    height: 5,
  },
  DESKTOP: {
    width: 5,
    height: 5,
  },
  SEND_MOBILE: {
    width: 4,
    height: 4,
  },
  SEND_DESKTOP: {
    width: 5,
    height: 5,
  },
};

export const ACCESSIBILITY_LABELS = {
  ADD_ATTACHMENT: "Add attachment",
  ATTACH_FILE: "Attach file",
  MESSAGE_INPUT: "Message input",
  TIMING_MODE: "Response timing mode",
  SEND_MESSAGE: "Send message",
};

export const MESSAGE_DEFAULTS = {
  USER_AVATAR_TEXT: "U",
  USER_LABEL: "You",
  ASSISTANT_LABEL: "Sentient",
  LOADING_TEXT: "Searching for what is sentient...",
  COPIED_TEXT: "Copied!",
  COPIED_TIMEOUT: 2000,
};

export const AVATAR_SIZES = {
  MOBILE: {
    width: 7,
    height: 7,
  },
  DESKTOP: {
    width: 8,
    height: 8,
  },
};

export const LOGO_SIZES = {
  AVATAR: 28,
  LOADING: 20,
  DESKTOP_AVATAR: {
    width: 8,
    height: 8,
  },
  DESKTOP_LOADING: {
    width: 6,
    height: 6,
  },
};

export const ICON_SIZES = {
  MOBILE: {
    width: 3.5,
    height: 3.5,
  },
  DESKTOP: {
    width: 4,
    height: 4,
  },
};

export const ANIMATION_CONFIG = {
  MESSAGE: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
};

export const ACCESSIBILITY_LABELS = {
  COPY: "Copy message",
  LIKE: "Like message",
  DISLIKE: "Dislike message",
};

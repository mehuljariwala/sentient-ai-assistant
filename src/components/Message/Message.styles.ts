export const messageContainerClasses = {
  base: "flex gap-3 lg:gap-4 p-4 lg:p-6",
  user: "bg-white dark:bg-gray-900",
  assistant: "bg-gray-50 dark:bg-gray-950",
};

export const avatarClasses = {
  container: "flex-shrink-0",
  userAvatar:
    "rounded-full bg-gray-900 dark:bg-gray-100 flex items-center justify-center",
  userAvatarMobile: "w-7 h-7",
  userAvatarDesktop: "lg:w-8 lg:h-8",
  userAvatarText:
    "text-white dark:text-gray-900 text-xs lg:text-sm font-medium",
};

export const contentClasses = {
  container: "flex-1 space-y-2",
  roleLabel: "text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300",
  loadingContainer: "flex items-center gap-2 text-gray-500 dark:text-gray-400",
  loadingText: "text-sm lg:text-base",
  messageText:
    "text-sm lg:text-base text-gray-900 dark:text-gray-100 markdown-content whitespace-pre-wrap",
};

export const actionClasses = {
  container: "flex items-center gap-1 lg:gap-2 pt-2",
  button:
    "p-1 lg:p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors",
  copiedText: "text-xs",
};

export const iconClasses = {
  base: "w-3.5 h-3.5 lg:w-4 lg:h-4",
};

export const logoClasses = {
  avatar: "lg:w-8 lg:h-8",
  loading: "lg:w-6 lg:h-6",
};

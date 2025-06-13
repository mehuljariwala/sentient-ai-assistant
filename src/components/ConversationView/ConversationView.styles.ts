export const conversationViewStyles = {
  container: "flex flex-col h-full bg-white dark:bg-gray-900 w-full relative",

  // Welcome screen styles
  welcomeContainer:
    "flex-1 flex flex-col items-center justify-center px-4 lg:px-8 pb-20 lg:pb-0",
  welcomeContent: "flex flex-col items-center w-full max-w-4xl",
  welcomeTextContainer: "hidden lg:block text-center",
  welcomeTitle: "mt-8 text-2xl font-semibold text-gray-900 dark:text-gray-100",
  welcomeSubtitle:
    "mt-2 text-gray-600 dark:text-gray-400 text-center max-w-md mb-12",
  welcomeInputWrapper: "w-full max-w-3xl mt-8 lg:mt-12 mb-6 lg:mb-8",
  welcomePromptsWrapper: "px-4 lg:px-0",

  // Messages view styles
  messagesContainer: "flex-1 overflow-y-auto pb-20 lg:pb-0",
  messagesContent: "max-w-4xl mx-auto min-h-full px-4 lg:px-8",

  // Input area styles
  inputArea:
    "fixed bottom-0 left-0 right-0 lg:relative lg:bottom-auto bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 pb-20 lg:pb-4",
  inputContent: "max-w-4xl mx-auto",
  followUpPrompts: "mt-4 hidden lg:flex",

  // Logo styles
  logo: "lg:w-20 lg:h-20",

  // Message input styles
  messageInput: "lg:shadow-sm",
};

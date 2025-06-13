export const containerBaseClasses =
  "flex flex-col gap-3 lg:gap-4 p-4 lg:p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm transition-all duration-200";

export const containerFocusClasses =
  "ring-2 ring-gray-900 dark:ring-gray-100 ring-offset-2";

export const textareaClasses =
  "flex-1 resize-none bg-transparent outline-none text-base lg:text-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 py-2";

export const buttonClasses = {
  base: "p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors cursor-pointer",
  mobile: "lg:hidden mt-1",
  desktop: "hidden lg:block",
};

export const timingToggleClasses = {
  container:
    "flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-0.5 lg:p-1 relative",
  background:
    "absolute h-[calc(100%-4px)] lg:h-[calc(100%-8px)] w-[calc(50%-2px)] lg:w-[calc(50%-4px)] bg-white dark:bg-gray-900 rounded-full shadow-sm",
  button:
    "relative z-10 px-3 lg:px-4 py-1 lg:py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-300 cursor-pointer",
  active: "text-gray-900 dark:text-gray-100",
  inactive:
    "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200",
};

export const sendButtonClasses = {
  base: "p-2 lg:p-2.5 rounded-lg transition-all cursor-pointer",
  active:
    "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200",
  disabled:
    "bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed",
};

export const iconClasses = {
  send: "w-4 h-4 lg:w-5 lg:h-5",
  attachment: "w-5 h-5",
};

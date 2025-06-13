export const navClasses = {
  container:
    "fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 lg:hidden",
  indicatorBar: "absolute top-0 left-0 right-0 h-1 overflow-hidden",
  indicatorContainer: "relative h-full flex",
  indicatorItem: "flex-1 relative",
  activeIndicator:
    "absolute inset-x-0 top-0 h-1 bg-gray-900 dark:bg-gray-100 rounded-b-full mx-auto w-16",
  bottomPadding: "pb-safe",
  navItems: "flex items-center justify-around py-2",
};

export const navItemClasses = {
  base: "flex flex-col items-center gap-1 px-6 py-2 transition-all duration-200 relative group",
  active: "text-gray-900 dark:text-gray-100",
  inactive:
    "text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400",
  hoverEffect:
    "absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200",
  iconContainer: "relative z-10",
  label: "text-xs font-medium relative z-10",
};

export const iconClasses = {
  base: "w-6 h-6",
  desktop: "lg:w-8 lg:h-8",
};

export const svgAttributes = {
  common: {
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as true,
  },
  stroke: {
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  },
};

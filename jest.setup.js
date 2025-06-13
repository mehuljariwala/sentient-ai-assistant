import "@testing-library/jest-dom";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      animate,
      initial,
      exit,
      transition,
      whileHover,
      whileTap,
      layoutId,
      ...props
    }) => <div {...props}>{children}</div>,
    button: ({
      children,
      animate,
      initial,
      exit,
      transition,
      whileHover,
      whileTap,
      layoutId,
      ...props
    }) => <button {...props}>{children}</button>,
    path: ({
      animate,
      initial,
      exit,
      transition,
      whileHover,
      whileTap,
      layoutId,
      ...props
    }) => <path {...props} />,
    circle: ({
      animate,
      initial,
      exit,
      transition,
      whileHover,
      whileTap,
      layoutId,
      ...props
    }) => <circle {...props} />,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

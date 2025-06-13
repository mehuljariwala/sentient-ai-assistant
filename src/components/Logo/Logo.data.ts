export const LOGO_DEFAULTS = {
  SIZE: 40,
  ANIMATE: false,
};

export const ANIMATION_CONFIG = {
  PATH_VARIANTS: {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.01 },
      },
    },
  },
  ROTATE_VARIANTS: {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        ease: "linear",
        repeat: Infinity,
      },
    },
  },
  HOVER_ANIMATION: {
    scale: 1.1,
    rotate: 180,
  },
  SPRING_CONFIG: {
    type: "spring",
    stiffness: 260,
    damping: 20,
  },
  CIRCLE_ANIMATION: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  },
};

export const SVG_PATHS = {
  OUTER_PATH:
    "M100 20L120 40L140 20L160 40L140 60L160 80L140 100L160 120L140 140L160 160L140 180L120 160L100 180L80 160L60 180L40 160L60 140L40 120L60 100L40 80L60 60L40 40L60 20L80 40L100 20Z",
  INNER_PATH:
    "M70 70L90 90L70 110L90 130L110 110L130 130L110 90L130 70L110 90L90 70L110 110L90 90Z",
};

export const SVG_CONFIG = {
  VIEWBOX: "0 0 200 200",
  STROKE_WIDTH: {
    OUTER: 8,
    INNER: 6,
  },
  CIRCLE: {
    CX: 100,
    CY: 100,
    RADIUS: 10,
  },
};

const transition = {
  duration: 1,
  ease: [0.76, 0, 0.24, 1],
};

export const motionParametr = {
  initial: {
    opacity: 0,
    filter: "blur(1vw)",
    transition,
  },
  animate: {
    opacity: 1,
    filter: "blur(0)",
    transition,
    transitionEnd: {
      filter: "none",
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(0)",
    transition: {
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

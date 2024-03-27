const transition = {
  ease: [0.88, 0.05, 0.1, 0.97],
  duration: 1,
};

export const MenuAnim = {
  presenceMenu: {
    initial: {
      width: "70vw",
      height: "80vh",
      opacity: 0,
      transition,
    },
    animate: {
      width: "100lvw",
      height: "100dvh",
      opacity: 1,
      transition,
    },
    exit: {
      width: "70vw",
      height: "80vh",
      opacity: 0,
      transition: {
        width: {
          ease: [0.88, 0.05, 0.1, 0.97],
          duration: 0.6,
          delay: 0.2,
        },
        height: {
          ease: [0.88, 0.05, 0.1, 0.97],
          duration: 0.6,
          delay: 0.2,
        },
        opacity: {
          ease: [0.88, 0.05, 0.1, 0.97],
          duration: 0.6,
          delay: 0.3,
        },
      },
    },
  },
  links: {
    initial: {
      y: "100%",
      opacity: 0.2,
      transition: {
        ease: [0.88, 0.05, 0.1, 0.97],
        duration: 1,
        delay: 1,
      },
    },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: i[0] },
    }),
    exit: {
      y: "100%",
      opacity: 0.2,
      transition: {
        ease: [0.88, 0.05, 0.1, 0.97],
        duration: 0.6,
      },
    },
  },
  socials: {
    initial: {
      y: "30%",
      opacity: 0,
      transition,
    },
    animate: {
      y: "0%",
      opacity: 1,
      transition: {
        transition,
        delay: 1,
      },
    },
    exit: {
      y: "30%",
      opacity: 0,
      transition: {
        transition,
        duration: 0.4
      },
    },
  },
};

export const anim = (variants) => {
  return {
    initial: "initial",
    animate: "animate",
    exit: "exit",
    variants,
  };
};

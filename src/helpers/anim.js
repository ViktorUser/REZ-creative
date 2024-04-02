export const anim = (variants) => {
  return {
    initial: "initial",
    animate: "animate",
    exit: "exit",
    variants,
  };
};

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
        duration: 0.4,
      },
    },
  },
};

export const HeaderAnim = {
  logo: {
    initial: {
      y: "80%",
      scale: 0.85,
      transition,
    },
    animate: {
      y: "0%",
      scale: 1,
      transition: {
        ease: [0.88, 0.05, 0.1, 0.97],
        duration: 1,
        delay: 0.4,
      },
    },
    exit: {
      y: "100%",
      scale: 0.85,
      // opacity: 0,
      transition: {
        ease: [0.88, 0.05, 0.1, 0.97],
        duration: 1.3,
      },
    },
  },
  navPresence: {
    initial: (side) => ({
      x: `${side}10%`,
      opacity: 0,
      transition,
    }),
    animate: {
      x: "0%",
      opacity: 1,
      transition: {
        ease: [0.88, 0.05, 0.1, 0.97],
        duration: 1,
        delay: 0.45,
      },
    },
    exit: (side) => ({
      x: `${side}10%`,
      opacity: 0,
      transition,
    }),
  },
  fixedPresence: {
    initial: {
      opacity: 0,
      transition,
    },
    animate: {
      opacity: 1,
      transition: {
        ...transition,
        delay: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        ...transition,
        delay: 0.1,
      },
    },
  },
};

export const PageTransition = {
  slide: {
    initial: {
      y: "100vh",
      scale: 0.9,
      display: "none",
    },
    animate:  {
      y: "100vh",
      scale: 1,
      display: "none",
    },
    exit: (isHome) => ({
      y: 0,
      scale: isHome ? 1 : 1.3,
      display: "block",
      transition: {
        y: {
          duration: 1.5,
          ease: [0.76, 0, 0.24, 1],
        },
        scale: {
          duration: 0.5,
          ease: [0.76, 0, 0.24, 1],
          delay: 1,
        },
      },
    }),
  },
  perspective: {
    initial: {
      scale: 1,
      y: 0,
      filter: "brightness(0) blur(0.2vw)",
    },
    animate: {
      scale: 1,
      y: 0,
      filter: "brightness(1) blur(0)",
      transitionEnd: {
        filter: "none",
      },
    },
    exit: {
      scale: 0.9,
      y: "-8%",
      filter: "brightness(0) blur(0.2vw)",
      // opacity: 0.5,
      transition: {
        duration: 1.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  },
  opacity: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 1,
    },
  },
};

export const servicesListAnim = {
  listPresence: {
    initial: {
      opacity: 0,
      height: "0vw",
      transition: {
        duration: 0.3,
        delay: 0.1,
        ease: [0.88, 0.05, 0.1, 0.97],
      },
    },
    animate: {
      height: "38vw",
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.88, 0.05, 0.1, 0.97],
        opacity: {
          duration: 1,
          delay: .4,
          ease: [0.88, 0.05, 0.1, 0.97],
        }
      },
    },
    exit: {
      opacity: 0,
      height: "0vw",
      transition: {
        opacity: {
          duration: .3,
          ease: [0.88, 0.05, 0.1, 0.97],
        },
        duration: 1,
        ease: [0.88, 0.05, 0.1, 0.97],
      },
    },
  },
};

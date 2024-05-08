import gsap from "gsap";

export const numAnim = (first, second) => {
  const tl = gsap.timeline({ repeat: 3, repeatRefresh: true });

  tl.to(first, {
    yPercent: "-=20",
    duration: 1.4,
    ease: "expo.out",
  });

  tl.to(
    second,
    {
      yPercent: "+=20",
      duration: 1.4,
      ease: "expo.out",
    },
    0
  );

  return tl;
};

export const linesAnim = (linesArray) => {
  const tl = gsap.timeline({ repeat: 3, repeatRefresh: true });

  linesArray.forEach((currLine) => {
    tl.to(
      currLine,
      {
        width: "+=25%",
        height: "+=25%",
        duration: 1.4,
        ease: "expo.out",
      },
      0
    );
  });

  return tl;
};

export const endingAnim = (image, progress, lastLine, isSpecialPage) => {
  const tl = gsap.timeline();

  tl
    .to(
      progress,
      {
        opacity: 0,
        duration: 0.4,
        ease: "expo.out",
      },
      0
    )
      tl.to(
        lastLine,
        {
          border: "none" ,
          duration: 0.4,
          delay: 1,
        },
        0
      ).to(image, {
        opacity: 1,
        height: "101%",
        duration: 1.4,
        ease: "expo.out",
      }, 0);


  return tl;
};

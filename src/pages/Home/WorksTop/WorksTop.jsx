import React, { useRef } from "react";

import "./WorksTop.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useIsTouchDevice } from "@/helpers/isTouchDevice";

export default function WorksTop() {
  const isTouch = useIsTouchDevice();

  return <>{isTouch ? <WorksTopMobile /> : <WorksTopDesktop />}</>;
}

const WorksTopMobile = () => {
  const titlesRef = useRef([]);
  const lineRef = useRef([]);
  const mainRef = useRef();

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const tl = gsap.timeline();

    lineRef.current.forEach((currLine, i) => {
      tl.set(currLine, { scale: 0.2 });

      tl.fromTo(
        currLine,
        {
          scale: 0.2,
        },
        {
          scale: 1,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "25% bottom",
            end: "40% 80%",
            scrub: (i + 1) * 0.6,
          },
        }
      );
    });

    titlesRef.current.forEach((currT, i) => {
      tl.fromTo(
        currT,
        {
          clipPath: "inset(0% 0 100% 0)",
          yPercent: 20,
        },
        {
          clipPath: "inset(0% 0 0% 0)",
          yPercent: 0,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "5% 90%",
            end: "10% 85%",
            scrub: (i + 3) * 0.9,
          },
        }
      );
    });
  });

  return (
    <section className="mobile works-top" ref={mainRef}>
      <div className="works-top__title mobile">
        <h1 className="super-text">
          <span ref={(el) => titlesRef.current.push(el)}>Hyper</span>
        </h1>
        <h1 className="super-text">
          <span ref={(el) => titlesRef.current.push(el)}>Resolution</span>
        </h1>
      </div>

      <div className="works-top__lines mobile">
        <span
          className="works-top__line works-top__line-1"
          ref={(el) => lineRef.current.push(el)}
        ></span>
        <span
          className="works-top__line works-top__line-2"
          ref={(el) => lineRef.current.push(el)}
        ></span>
        <span
          className="works-top__line works-top__line-3"
          ref={(el) => lineRef.current.push(el)}
        ></span>

      </div>
        <h1 className="super-text works-top__final-title mobile">Find your game</h1>
    </section>
  );
};

const WorksTopDesktop = () => {
  const mainRef = useRef();
  const finalTitleRef = useRef();
  const titlesRef = useRef([]);
  const lineRef = useRef([]);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const tl = gsap.timeline();

    lineRef.current.forEach((currLine, i) => {
      tl.set(currLine, { scale: 0.4 });

      tl.fromTo(
        currLine,
        {
          scale: 0.3,
        },
        {
          scale: 0.65,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "top 75%",
            end: "top 0%",
            scrub: (i + 1) * 0.2,
          },
        }
      );

      tl.fromTo(
        currLine,
        {
          scale: 0.65,
        },
        {
          scale: 1,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "25% bottom",
            end: "40% top",
            scrub: (i + 1) * 0.2,
          },
        }
      );

      tl.fromTo(
        currLine,
        {
          scale: 1,
        },
        {
          scale: 0.75,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "55% bottom",
            end: "75% top",
            scrub: (i + 1) * 0.2,
          },
        }
      );
    });

    titlesRef.current.forEach((currT, i) => {
      tl.set(currT, {
        clipPath: "inset(0% 0 100% 0)",
        yPercent: 20,
      });

      tl.fromTo(
        currT,
        {
          clipPath: "inset(0% 0 100% 0)",
          yPercent: 20,
        },
        {
          clipPath: "inset(0% 0 0% 0)",
          yPercent: 0,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "0% 65%",
            end: "0% 45%",
            scrub: (i + 3) * 0.9,
          },
        }
      );

      tl.fromTo(
        currT,
        {
          clipPath: "inset(0% 0 0% 0)",
          yPercent: 0,
        },
        {
          clipPath: "inset(100% 0 0% 0)",
          yPercent: -20,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "60% bottom",
            end: "70% top",
            scrub: (i + 1) * 0.2,
          },
        }
      );
    });

    tl.fromTo(
      finalTitleRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        ease: "expo.inOut",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "15% 65%",
          end: "15% 65%",
          scrub: 2,
        },
      }
    );

    tl.fromTo(
      finalTitleRef.current,
      {
        scale: 0.2,
      },
      {
        scale: 1,
        ease: "expo.inOut",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "60% bottom",
          end: "75% top",
          scrub: 2,
        },
      }
    );
  });

  return (
    <section className="works-top">
      <div className="works-top__main" ref={mainRef}>
        <div className="sticky">
          <div className="works-top__title">
            <h1 className="super-text">
              <span ref={(el) => titlesRef.current.push(el)}>Hyper</span>
            </h1>
            <h1 className="super-text">
              <span ref={(el) => titlesRef.current.push(el)}>Resolution</span>
            </h1>
          </div>

          <h1 ref={finalTitleRef} className="super-text works-top__final-title">
            Find your game
          </h1>

          <div className="works-top__lines">
            <span
              className="works-top__line works-top__line-1"
              ref={(el) => lineRef.current.push(el)}
            ></span>
            <span
              className="works-top__line works-top__line-2"
              ref={(el) => lineRef.current.push(el)}
            ></span>
            <span
              className="works-top__line works-top__line-3"
              ref={(el) => lineRef.current.push(el)}
            ></span>
          </div>
        </div>
      </div>
    </section>
  );
};

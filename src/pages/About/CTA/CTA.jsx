import React, { useContext, useRef } from "react";
import "./CTA.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";

export default function CTA() {
  const titleRef = useRef();
  const wrapperRef = useRef();
  const linesRef = useRef([]);
  const titlesRef = useRef([]);

  gsap.registerPlugin(ScrollTrigger);

  const { data, isLoading } = useContext(DataContext);

  useGSAP(() => {
    const mediaQuery = window.matchMedia("(min-aspect-ratio: 16/9)");


    if (mediaQuery.matches) {
      gsap.fromTo(
        titleRef.current,
        {
          scale: 1,
        },
        {
          scale: 0.7,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }

    titlesRef.current.forEach((currT, i) => {
      gsap.set(currT, {
        yPercent: 20,
        clipPath: "inset(0 0 100% 0)",
      });

      gsap.to(
        currT,
        {
          yPercent: -2,
          clipPath: "inset(0 0 0% 0)",
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "0% 85%",
            end: "0% 65%",
            scrub: (i + 3) * 0.9,
          },
        },
        ">"
      );
    });

    linesRef.current.forEach((currLine, i) => {
      gsap.set(currLine, { scale: 0.2 });

      gsap.fromTo(
        currLine,
        {
          scale: 0.2,
        },
        {
          scale: 1,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "5% bottom",
            end: "40% 80%",
            scrub: (i + 1) * 0.6,
          },
        }
      );
    });
  }, [isLoading]);

  return (
    <section className="cta container" ref={wrapperRef}>
      <div className="cta__title-wrapper">
        <h1 className="cta__title super-text" ref={titleRef}>
          <p ref={(p) => titlesRef.current.push(p)}>Let’s make something</p>
          <p ref={(p) => titlesRef.current.push(p)}>extraordinary</p>
          <p ref={(p) => titlesRef.current.push(p)}>together</p>
        </h1>
      </div>
      <div className="cta__lines">
        <span
          className="cta__line cta__line--1"
          ref={(l) => linesRef.current.push(l)}
        />
        <span
          className="cta__line cta__line--2"
          ref={(l) => linesRef.current.push(l)}
        />
        <span
          className="cta__line cta__line--3"
          ref={(l) => linesRef.current.push(l)}
        />
      </div>
    </section>
  );
}

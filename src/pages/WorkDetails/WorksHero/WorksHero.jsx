import { DataContext } from "@/helpers/dataHelpers/dataProvider";
import React, { useContext, useRef } from "react";

import "./WorksHero.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase, ScrollTrigger } from "gsap/all";

export default function WorksHero() {
  const { data, isLoading } = useContext(DataContext);

  const backgroundRef = useRef();
  const titleRef = useRef();
  const topRef = useRef();

  gsap.registerPlugin(CustomEase, ScrollTrigger);

  useGSAP(() => {
    const tl = gsap.timeline();

    if (!isLoading) {
      tl.add(
        gsap.fromTo(
          topRef.current,
          {
            clipPath: "inset(0 0 15% 0)",
          },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.7,
            delay: 0.7,
            ease: CustomEase.create(
              "custom",
              "M0,0 C0.17,0 0.308,0.115 0.331,0.155 0.389,0.256 0.391,0.359 0.434,0.555 0.478,0.751 0.661,0.877 0.661,0.877 0.661,0.877 0.794,1 1,1 "
            ),
          }
        ),
        0
      );

      tl.add(
        gsap.fromTo(
          titleRef.current,
          {
            yPercent: 30,
            opacity: 0.4,
          },
          {
            yPercent: -30,
            opacity: 1,
            duration: 0.7,
            delay: 0.7,
            ease: CustomEase.create(
              "custom",
              "M0,0 C0.17,0 0.308,0.115 0.331,0.155 0.389,0.256 0.391,0.359 0.434,0.555 0.478,0.751 0.661,0.877 0.661,0.877 0.661,0.877 0.794,1 1,1 "
            ),
          }
        ),
        0
      );

      tl.add(
        gsap.fromTo(
          backgroundRef.current,
          {
            // backgroundSize: "102%",
            scale: 1,
          },
          {
            // backgroundSize: "110%",
            scale: 1.1,
            duration: 0.7,
            delay: 0.7,
            ease: CustomEase.create(
              "custom",
              "M0,0 C0.17,0 0.308,0.115 0.331,0.155 0.389,0.256 0.391,0.359 0.434,0.555 0.478,0.751 0.661,0.877 0.661,0.877 0.661,0.877 0.794,1 1,1 "
            ),
          }
        ),
        0
      );

      tl.to(backgroundRef.current, {
        yPercent: 6,
        scrollTrigger: {
          trigger: backgroundRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })
    }
  }, [isLoading]);

  return (
    !isLoading && (
      <section className="works-hero">
        <div className="top" ref={topRef}>
          <h1 className="super-text top__title" ref={titleRef}>
            {data.main.title}
            {/* {data.main.title}
            {data.main.title} */}
          </h1>
        </div>
        {/* <div
          className="works-hero__bg"
          style={{ backgroundImage: `url(${data.main.image})` }}
          ref={backgroundRef}
        /> */}
        <img src={data.main.image} alt="works-hero" className="works-hero__bg" ref={backgroundRef}/>
      </section>
    )
  );
}

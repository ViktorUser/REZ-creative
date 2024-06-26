import React, { useContext, useRef } from "react";
import "./TeamHero.scss";
import gsap from "gsap";
import { CustomEase, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";
import { LoaderContext } from "@/components/Loader/LoaderContext";

export default function TeamHero() {
  const sliderImageRef = useRef([]);
  const sliderWrapperRef = useRef();
  const sliderPresenceRef = useRef();
  const titleRef = useRef();
  const teamHeroRef = useRef();

  const { data, isLoading } = useContext(DataContext);
  const { loaderFinished } = useContext(LoaderContext);

  gsap.registerPlugin(ScrollTrigger, CustomEase);

  useGSAP(() => {
    const tl = gsap.timeline();
    if (loaderFinished) {
      tl.fromTo(
        titleRef.current,
        {
          yPercent: 20,
          clipPath: "inset(0 0 100% 0)",
        },
        {
          yPercent: -2,
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          delay: 0.5,
          ease: CustomEase.create(
            "custom",
            "M0,0 C0.17,0 0.308,0.115 0.331,0.155 0.389,0.256 0.391,0.359 0.434,0.555 0.478,0.751 0.661,0.877 0.661,0.877 0.661,0.877 0.794,1 1,1 "
          ),
        }
      );

      tl.fromTo(
        sliderPresenceRef.current,
        {
          xPercent: 2,
          opacity: 0,
        },
        {
          xPercent: 0,
          opacity: 1,
          ease: CustomEase.create(
            "custom",
            "M0,0 C0.17,0 0.308,0.115 0.331,0.155 0.389,0.256 0.391,0.359 0.434,0.555 0.478,0.751 0.661,0.877 0.661,0.877 0.661,0.877 0.794,1 1,1 "
          ),
          duration: 1,
          delay: 0.4,
        },
        "<0%"
      );

      tl.fromTo(
        sliderWrapperRef.current,
        {
          xPercent: 20,
        },
        {
          xPercent: -20,
          scrollTrigger: {
            trigger: teamHeroRef.current,
            start: `top 10%`,
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      sliderImageRef.current.forEach((currImg) => {
        tl.to(currImg, {
          backgroundPositionX: "100%",
          scrollTrigger: {
            trigger: teamHeroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 5,
          },
        });
      });
    }
  }, [isLoading, loaderFinished]);

  return (
    <section className="team-hero" ref={teamHeroRef}>
      {data && !isLoading && (
        <>
          <h1 className="super-text team-hero__title" ref={titleRef}>
            {data?.hero.title}
          </h1>

          <div
            className="team-hero__slider-presence-wrapper"
            ref={sliderPresenceRef}
          >
            <div className="team-hero__slider" ref={sliderWrapperRef}>
              {data.hero.slider.map((currImgSlider, i) => (
                <div
                  className="team-hero__image"
                  key={`team-hero__image--${i}`}
                  style={{ backgroundImage: `url(${currImgSlider})` }}
                  ref={(img) => sliderImageRef.current.push(img)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

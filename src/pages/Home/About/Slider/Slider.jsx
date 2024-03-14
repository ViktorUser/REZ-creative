import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import sliderIcon1 from "./Icons/slider1.svg";
import sliderIcon2 from "./Icons/slider2.svg";
import sliderIcon3 from "./Icons/slider3.svg";
import sliderIcon4 from "./Icons/slider4.svg";

import "./Slider.scss";

export const Slider = () => {
  const sliderRef = useRef();
  const iconRef = useRef();
  const wrapperRef = useRef();

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    if ((sliderRef, wrapperRef)) {
      gsap.set(sliderRef.current, {
        xPercent: 25,
      });

      gsap.to(sliderRef.current, {
        xPercent: -46,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 30%",
          end: 'bottom bottom',
          scrub: 1,
        },
      });
    }
  }, []);

  useGSAP(() => {
    if (iconRef && wrapperRef) {
      gsap.set(iconRef.current, {
        yPercent: -700,
        rotate: 270,
        scale: 1.7,
      });
      gsap.to(iconRef.current, {
        yPercent: 0,
        rotate: 360,
        scale: 1,
        ease: "expo.inOut",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });
    }
  }, [iconRef, wrapperRef]);

  return (
    <div className="slider__wrapper" ref={wrapperRef}>
      <div className="slider" ref={sliderRef}>
        <div className="slider__item">
          <div className="top" ref={iconRef}>
            <img src={sliderIcon1} className="slider__icon" />
          </div>
          <div className="main">
            <p className="body-text-secondary">Strategy</p>
            <p className="shadow">Integrated campaigns, social media, print</p>
          </div>
          <div className="bottom shadow">01</div>
        </div>
        <div className="slider__item">
          <div className="top">
            <img src={sliderIcon2} className="slider__icon" />
          </div>
          <div className="main">
            <p className="body-text-secondary">Trailers</p>
            <p className="shadow">In-game & In-engine gameplay</p>
          </div>
          <div className="bottom shadow">02</div>
        </div>
        <div className="slider__item">
          <div className="top">
            <img src={sliderIcon3} className="slider__icon" />
          </div>
          <div className="main">
            <p className="body-text-secondary">Cinematics</p>
            <p className="shadow">CGI, 2D, 2.5D</p>
          </div>
          <div className="bottom shadow">03</div>
        </div>
        <div className="slider__item">
          <div className="top">
            <img src={sliderIcon4} className="slider__icon" />
          </div>
          <div className="main">
            <p className="body-text-secondary">Art</p>
            <p className="shadow">Key art, marketing art, logo</p>
          </div>
          <div className="bottom shadow">04</div>
        </div>
      </div>
    </div>
  );
};

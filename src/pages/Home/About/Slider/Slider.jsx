import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import sliderIcon1 from "./Icons/slider1.svg";
import sliderIcon2 from "./Icons/slider2.svg";
import sliderIcon3 from "./Icons/slider3.svg";
import sliderIcon4 from "./Icons/slider4.svg";

import { useIsTouchDevice } from "@/helpers/isTouchDevice";

import "./Slider.scss";

export const Slider = () => {
  const isTouch = useIsTouchDevice();

  return (
    <>
      {isTouch ? (<SliderTouch />) : <SliderDesktop/>}
    </>
  )
} 

const SliderDesktop = () => {
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
          scrub: 2,
        },
      });
    }
  }, []);

  useGSAP(() => {
    if (iconRef && wrapperRef) {
      gsap.set(iconRef.current, {
        yPercent: -670,
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
          scrub: 1.2,
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
            <h3 className="semiBold">Strategy</h3>
            <p className="shadow">Integrated campaigns, social media, print</p>
          </div>
          <div className="bottom shadow">01</div>
        </div>
        <div className="slider__item">
          <div className="top">
            <img src={sliderIcon2} className="slider__icon" />
          </div>
          <div className="main">
            <h3 className="semiBold">Trailers</h3>
            <p className="shadow">In-game & In-engine gameplay</p>
          </div>
          <div className="bottom shadow">02</div>
        </div>
        <div className="slider__item">
          <div className="top">
            <img src={sliderIcon3} className="slider__icon" />
          </div>
          <div className="main">
            <h3 className="semiBold">Cinematics</h3>
            <p className="shadow">CGI, 2D, 2.5D</p>
          </div>
          <div className="bottom shadow">03</div>
        </div>
        <div className="slider__item">
          <div className="top">
            <img src={sliderIcon4} className="slider__icon" />
          </div>
          <div className="main">
            <h3 className="semiBold">Art</h3>
            <p className="shadow">Key art, marketing art, logo</p>
          </div>
          <div className="bottom shadow">04</div>
        </div>
      </div>
    </div>
  );
};

const SliderTouch = () => {
  return (
      <div className="slider touch">
        <div className="slider__item">
          <div className="top">
            <img src={sliderIcon1} className="slider__icon" />
          </div>
          <div className="main">
            <h3 className="semiBold">Strategy</h3>
            <p className="shadow">Integrated campaigns, social media, print</p>
          </div>
          <div className="bottom shadow">01</div>
        </div>
        <div className="slider__item">
          <div className="top">
            <img src={sliderIcon2} className="slider__icon" />
          </div>
          <div className="main">
            <h3 className="semiBold">Trailers</h3>
            <p className="shadow">In-game & In-engine gameplay</p>
          </div>
          <div className="bottom shadow">02</div>
        </div>
        <div className="slider__item">
          <div className="top">
            <img src={sliderIcon3} className="slider__icon" />
          </div>
          <div className="main">
            <h3 className="semiBold">Cinematics</h3>
            <p className="shadow">CGI, 2D, 2.5D</p>
          </div>
          <div className="bottom shadow">03</div>
        </div>
        <div className="slider__item">
          <div className="top">
            <img src={sliderIcon4} className="slider__icon" />
          </div>
          <div className="main">
            <h3 className="semiBold">Art</h3>
            <p className="shadow">Key art, marketing art, logo</p>
          </div>
          <div className="bottom shadow">04</div>
        </div>
      </div>

  );
}

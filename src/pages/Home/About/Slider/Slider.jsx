import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import { useIsTouchDevice } from "@/helpers/isTouchDevice";

import "./Slider.scss";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";

export const Slider = () => {
  const isTouch = useIsTouchDevice();

  return <>{isTouch ? <SliderTouch /> : <SliderDesktop />}</>;
};

const SliderDesktop = () => {
  const sliderRef = useRef();
  const iconRef = useRef();
  const wrapperRef = useRef();

  const { data, isLoading } = useContext(DataContext);
  
  gsap.registerPlugin(ScrollTrigger);
  
  useEffect(() => {
    ScrollTrigger.refresh(true)
  }, [isLoading])

  useGSAP(() => {
    if (!isLoading && sliderRef && wrapperRef) {
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
  }, [isLoading, wrapperRef, sliderRef]);

  useGSAP(() => {
    if (!isLoading && iconRef && wrapperRef) {
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
  }, [iconRef, wrapperRef, isLoading]);

  return !isLoading && (
    <div className="slider__wrapper" ref={wrapperRef}>
      {/* {!isLoading && ( */}
        <div className="slider" ref={sliderRef}>
          <div className="slider__item">
            <div className="top" ref={iconRef}>
              <img src={data.about.list[0].icon} className="slider__icon" />
            </div>
            <div className="main">
              <h3 className="semiBold">{data.about.list[0].title}</h3>
              <p className="shadow">{data.about.list[0].text}</p>
            </div>
            <div className="bottom shadow">{data.about.list[0].number}</div>
          </div>
          {data.about.list.slice(1).map((currAb, i) => (
            <div className="slider__item" key={`home_aboutList--${i}-item`}>
              <div className="top">
                <img src={currAb.icon} className="slider__icon" />
              </div>
              <div className="main">
                <h3 className="semiBold">{currAb.title}</h3>
                <p className="shadow">{currAb.text}</p>
              </div>
              <div className="bottom shadow">{currAb.number}</div>
            </div>
          ))}
        </div>
      {/* )} */}
    </div>
  );
};

const SliderTouch = () => {
  const { data, isLoading } = useContext(DataContext);

  return (
    <div className="slider touch">
      {!isLoading &&
        data.about.list.map((currAb, i) => (
          <div className="slider__item" key={`home_aboutList--mobile-${i}-item`}>
            <div className="top">
              <img src={currAb.icon} className="slider__icon" />
            </div>
            <div className="main">
              <h3 className="semiBold">{currAb.title}</h3>
              <p className="shadow">{currAb.text}</p>
            </div>
            <div className="bottom shadow">{currAb.number}</div>
          </div>
      ))}
      </div>
  );
};

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useIsTouchDevice } from "@/helpers/isTouchDevice";

import "./AboutSlider.scss";

export const AboutSlider = () => {
  const isTouch = useIsTouchDevice();

  return <>{isTouch ? <AboutSliderMobile /> : <AboutSliderDesktop />}</>;
};

const AboutSliderMobile = () => {
  return (
    <>
      <div className="about-slider__wrapper touch">
        <div className="about-slider">
          <div className="about-slider__item">
            <div className="text">
              <p className="smallText semiBold upperCase">Experts</p>
              <p>
                As industry experts, we are the trusted choice for blockbuster
                titles, leveraging our in-depth understanding of games to
                deliver unparalleled creativity.
              </p>
            </div>
            <img
              src="/media/AboutPage/Slider/experts.jpg"
              alt="experts slider"
              className="about-slider__image"
            />
          </div>
          <div className="about-slider__item">
            <div className="text">
              <p className="smallText semiBold upperCase">Strategically</p>
              <p>
                Connecting clients worldwide, our in- house teams span the
                globe, strategically positioned for global excellence.
              </p>
            </div>
            <img
              src="/media/AboutPage/Slider/strategically.jpg"
              alt="experts slider"
              className="about-slider__image"
            />
          </div>
        </div>
      </div>
      <div className="about-slider__item--sticky">
        <div className="text">
          <h1 className="super-text">Unmatched expertise</h1>
          <p>
            Renowned as best-in-class, creative is your premier partner,
            delivering unmatched expertise to elevate your brand experiences
            across continents
          </p>
        </div>
      </div>
    </>
  );
};

const AboutSliderDesktop = () => {
  const sliderRef = useRef();
  const wrapperRef = useRef();
  const sliderOneRef = useRef();
  const sliderOneImageRef = useRef();

  const sliderSecondRef = useRef();
  const sliderSecondImageRef = useRef();

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      sliderRef.current,
      { xPercent: 10, filter: "brightness(0)" },
      {
        xPercent: 0,
        filter: "brightness(1)",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "top 80%",
          scrub: 3,
        },
      }
    );

    tl.fromTo(
      sliderRef.current,
      { xPercent: 0 },
      {
        xPercent: -82,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 10%",
          end: "75% bottom",
          scrub: 1,
        },
      }
    );

    tl.to(sliderOneImageRef.current, {
      backgroundPositionX: '100%',
      scrollTrigger: {
        trigger: sliderOneRef.current,
        start: 'top 20%',
        end: 'bottom top',
        scrub: 2,
      }
    }, 0)
    
    tl.to(sliderSecondImageRef.current, {
      backgroundPositionX: '100%',
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: '14% 20%',
        end: '40% top',
        scrub: 2,
      }
    }, 0)
  });

  return (
    <div className="about-slider__wrapper" ref={wrapperRef}>
      <div className="about-slider" ref={sliderRef}>
        <div className="about-slider__item" ref={sliderOneRef}>
          <div className="text">
            <p className="smallText semiBold upperCase">Experts</p>
            <p>
              As industry experts, we are the trusted choice for blockbuster
              titles, leveraging our in-depth understanding of games to deliver
              unparalleled creativity.
            </p>
          </div>
          <div
            style={{
              backgroundImage: "url(/media/AboutPage/Slider/experts.jpg)",
            }}
            ref={sliderOneImageRef}
            src="/media/AboutPage/Slider/experts.jpg"
            className="about-slider__image"
          />
        </div>
        <div className="about-slider__item" ref={sliderSecondRef}>
          <div className="text">
            <p className="smallText semiBold upperCase">Strategically</p>
            <p>
              Connecting clients worldwide, our in- house teams span the globe,
              strategically positioned for global excellence.
            </p>
          </div>
          <div
            style={{
              backgroundImage: "url(/media/AboutPage/Slider/strategically.jpg)",
            }}
            ref={sliderSecondImageRef}
            alt="experts slider"
            className="about-slider__image"
          />
        </div>
        <div className="about-slider__item--sticky">
          <div className="text">
            <h1 className="super-text">Unmatched expertise</h1>
            <p>
              Renowned as best-in-class, creative is your premier partner,
              delivering unmatched expertise to elevate your brand experiences
              across continents
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

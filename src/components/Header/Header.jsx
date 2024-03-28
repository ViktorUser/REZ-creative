import React, { useContext, useEffect, useRef, useState } from "react";
import { Logo } from "../Logo/Logo";
import "./Header.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import classNames from "classnames";
import { CustomEase } from "gsap/all";
import { Nav } from "./Nav/Nav";
import { AnimatePresence } from "framer-motion";
import { LoaderContext } from "../Loader/LoaderContext";

export const Header = () => {
  const headerRef = useRef();
  const logoRef = useRef();
  const rightRef = useRef([]);
  const leftRef = useRef();

  const [isActive, setisActive] = useState(false);

  gsap.registerPlugin(CustomEase)

  useEffect(() => {
    const handleScroll = () => {
      setisActive(false);
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useGSAP(() => {
    gsap.set(logoRef.current, {
      yPercent: 80,
      scale: 0.85,
    });
    gsap.set(leftRef.current, { xPercent: -10, opacity: 0 });
    
    rightRef.current.forEach((currR) => {
      gsap.set(currR, { xPercent: 10, opacity: 0 });
    })

    const presenceEase = {
      ease: CustomEase.create("custom", "M0,0 C0.17,0 0.308,0.115 0.331,0.155 0.389,0.256 0.391,0.359 0.434,0.555 0.478,0.751 0.661,0.877 0.661,0.877 0.661,0.877 0.794,1 1,1 "),
      duration: 1,
    }

    const headrePresenceTl = gsap.timeline({
      delay: 0.5,
    });
    
    headrePresenceTl
      .to(logoRef.current, { yPercent: 0, scale: 1, ...presenceEase })
      .to(rightRef.current, { xPercent: 0, opacity: 1, ...presenceEase }, '<')
      .to(leftRef.current, { xPercent: 0, opacity: 1, ...presenceEase }, '<');

    gsap.fromTo(
      headerRef.current,
      {
        yPercent: -100,
      },
      {
        yPercent: 0,
        ease: "expo.inOut",
        ...presenceEase.ease,
        scrollTrigger: {
          trigger: document.documentElement,
          start: `${window.innerHeight} top`,
          end: `${window.innerHeight} top`,
          scrub: 5,
        },
      }
    );
  }, [window.innerHeight]);

  return (
    <>
      <header className="header">
        <div className="left" ref={leftRef}>
          <a href="/">Work</a>
          <a href="/">About us</a>
        </div>
        <div className="header__logo-wrapper">
          <div className="header__logo" ref={logoRef}>
            <Logo />
          </div>
        </div>
        <div className="right" ref={(el) => rightRef.current.push(el)}>
          <a href="/" className="link-with-arrow">Join our team</a>
          <a href="/">Contact us</a>
        </div>

        <div className="header__menu-button" ref={(el) => rightRef.current.push(el)}>
          <HeaderButton isActive={isActive} setIsActive={setisActive} />
        </div>
      </header>

      <header
        className="header header--fixed"
        ref={headerRef}
      >
        <div className="left">
          <a href="/">Work</a>
          <a href="/">About us</a>
        </div>
        <div className="header__logo-wrapper">
          <div className="header__logo">
            <Logo />
          </div>
        </div>

        <div className="right">
          <a href="/" className="link-with-arrow">Join our team</a>
          <a href="/">Contact us</a>
        </div>

        <div className="header__menu-button">
          <HeaderButton isActive={isActive} setIsActive={setisActive}/>
        </div>
      </header>
    <AnimatePresence mode="wait">
      {isActive && <Nav />}
    </AnimatePresence>
    </>
  );
};

const HeaderButton = ({ isActive, setIsActive }) => {

  const handleCrossButton = () => {
    return classNames("header-button__line", {
      ["header-button__line--active"]: isActive
    })
  }

  return (
    <div className="header-button" onClick={() => setIsActive(!isActive)}>
      <span className={handleCrossButton()} />
      <span className={handleCrossButton()} />
    </div>
  )
}

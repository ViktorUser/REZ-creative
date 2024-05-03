import React, { useContext, useEffect, useRef, useState } from "react";
import { Logo } from "../Logo/Logo";
import "./Header.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import classNames from "classnames";
import { CustomEase, ScrollTrigger } from "gsap/all";
import { Nav } from "./Nav/Nav";
import { motion, AnimatePresence } from "framer-motion";
import { LoaderContext } from "../Loader/LoaderContext";
import { Link, useLocation } from "react-router-dom";
import { motionParametr } from "@/helpers/motionParametr";
import { HeaderAnim, MenuAnim, anim } from "@/helpers/anim";
import AnchorLink from "../AnchorLink/AnchorLink";

export const Header = () => {
  const { loaderFinished } = useContext(LoaderContext);

  const location = useLocation();
  const { pathname } = location;

  const [isActive, setisActive] = useState(false);
  const [isFixed, setisFixed] = useState(false);

  gsap.registerPlugin(CustomEase, ScrollTrigger);

  useEffect(() => {
    const handleScroll = () => {
      setisActive(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: `${window.innerHeight} top`,
      end: `${window.innerHeight} top`,
      onEnter: () => setisFixed(true),
      onLeaveBack: () => setisFixed(false),
    });
  }, [window.innerHeight, pathname]);

  return loaderFinished && (
    <AnimatePresence mode="wait">
      <motion.header className="header" key={`header-location-${pathname}`}>
        <motion.div
          custom={"-"}
          className="left"
          {...anim(HeaderAnim.navPresence)}
        >
          <Link to="/work">Work</Link>
          <Link to="/about">About us</Link>
        </motion.div>

        <Link to="/" className="header__logo-wrapper">
          <motion.div
            {...anim(HeaderAnim.logo)}
            className="header__logo"
            onClick={() => setisActive(false)}
          >
            <Logo />
          </motion.div>
        </Link>
        <motion.div
          custom={""}
          className="right"
          {...anim(HeaderAnim.navPresence)}
        >
          <Link to="/vacancies" className="link-with-arrow">
            Join our team
          </Link>
          <AnchorLink toSection="#contact-us">Contact us</AnchorLink>
        </motion.div>

        <motion.div
          custom={""}
          className="header__menu-button"
          {...anim(HeaderAnim.navPresence)}
        >
          <HeaderButton isActive={isActive} setIsActive={setisActive} />
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {isFixed && (
          <motion.header
            className="header header--fixed"
            {...anim(HeaderAnim.fixedPresence)}
            key={`header--fixed-${pathname}`}
          >
            <motion.div
              custom={"-"}
              className="left"
              {...anim(HeaderAnim.navPresence)}
            >
              <Link to="/work">Work</Link>
              <Link to="/about">About us</Link>
            </motion.div>

            <Link to="/" className="header__logo-wrapper">
              <motion.div
                {...anim(HeaderAnim.logo)}
                className="header__logo"
                onClick={() => setisActive(false)}
              >
                <Logo />
              </motion.div>
            </Link>
            <motion.div
              custom={""}
              className="right"
              {...anim(HeaderAnim.navPresence)}
            >
              <Link to="/vacancies" className="link-with-arrow">
                Join our team
              </Link>
              <AnchorLink toSection="#contact-us">Contact us</AnchorLink>
            </motion.div>

            <motion.div
              custom={""}
              className="header__menu-button"
              {...anim(HeaderAnim.navPresence)}
            >
              <HeaderButton isActive={isActive} setIsActive={setisActive} />
            </motion.div>
          </motion.header>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {isActive && <Nav setisActive={setisActive} />}
      </AnimatePresence>
    </AnimatePresence>
  );
};

const HeaderButton = ({ isActive, setIsActive }) => {
  const handleCrossButton = () => {
    return classNames("header-button__line", {
      ["header-button__line--active"]: isActive,
    });
  };

  return (
    <div className="header-button" onClick={() => setIsActive(!isActive)}>
      <span className={handleCrossButton()} />
      <span className={handleCrossButton()} />
    </div>
  );
};

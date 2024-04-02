import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "./Loader.scss";
import { motionParametr } from "@/helpers/motionParametr";
import { LoaderContext } from "./LoaderContext";
import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import { endingAnim, linesAnim, numAnim } from "./LoaderAnim";

export const Loader = () => {
  const { loaderFinished, setLoaderFinished } = useContext(LoaderContext);

  const [isHomePage, setIsHomePage] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  useLayoutEffect(() => {
    if (pathname === "/") {
      setIsHomePage(true);
    }
  }, [location]);

  const loaderRef = useRef();
  const progressWrapperRef = useRef();
  const progressNumFirst = useRef();
  const progressNumSecond = useRef();
  const imageRef = useRef();
  const linesRef = useRef([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => setLoaderFinished(true),
    });

    gsap.set(progressNumSecond.current, {
      yPercent: -80,
    });

    tl.add(numAnim(progressNumFirst.current, progressNumSecond.current), 0);
    tl.add(linesAnim(linesRef.current), 0);
    tl.add(
      endingAnim(
        imageRef.current,
        progressWrapperRef.current,
        linesRef.current[3],
        loaderRef.current,
        isHomePage
      ),
      "<77%"
    );
  });

  return (
    <AnimatePresence>
    {!loaderFinished && (
        <motion.section {...motionParametr} className="loader" ref={loaderRef}>
          <div className="progress" ref={progressWrapperRef}>
            <div className="progress__num-wrapper">
              <div ref={progressNumFirst} className="progress__num">
                <span>0</span>
                <span>2</span>
                <span>5</span>
                <span>8</span>
                <span>9</span>
              </div>
            </div>
            <div className="progress__num-wrapper">
              <div ref={progressNumSecond} className="progress__num">
                <span>9</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>0</span>
              </div>
            </div>
            <div className="progress__num">%</div>
          </div>
          <div className="lines">
            <span className="line" ref={(l) => linesRef.current.push(l)} />
            <span className="line" ref={(l) => linesRef.current.push(l)} />
            <span className="line" ref={(l) => linesRef.current.push(l)} />
            <span
              className="line line--last"
              ref={(l) => linesRef.current.push(l)}
            >
              {/* <img src="/media/loaderImage.webp" alt="" ref={imageRef} /> */}
              <div ref={imageRef} className="line__image-wrapper">
                {isHomePage && (
                  <img
                    src="/media/loaderImage.webp"
                    alt=""
                    className="line__image"
                  />
                )}
              </div>
              {/* <video
                  loop
                  muted
                  webkit-playsinline="true"
                  playsInline
                  ref={imageRef}
                >
                  <source src="/media/Video/Trailers.mp4" />
                </video> */}
            </span>
          </div>
        </motion.section>)}
    
    </AnimatePresence>
  );
};

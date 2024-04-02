import { BorderButton } from "@/components/Button/BorderButton/BorderButton";
import React, { useEffect, useRef, useState } from "react";

import "./Reel.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/all";

import Vimeo from "@u-wave/react-vimeo";
import ReactPlayer from "react-player";
import classNames from "classnames";
import { useIsTouchDevice } from "@/helpers/isTouchDevice";

export default function Reel() {
  const titleRef = useRef();
  const presenceAnimRef = useRef();
  const [isStarted, setIsStarted] = useState(false);

  const isTouch = useIsTouchDevice();

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.5 });

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
        ease: CustomEase.create(
          "custom",
          "M0,0 C0.17,0 0.308,0.115 0.331,0.155 0.389,0.256 0.391,0.359 0.434,0.555 0.478,0.751 0.661,0.877 0.661,0.877 0.661,0.877 0.794,1 1,1 "
        ),
      }
    );

    tl.fromTo(
      presenceAnimRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
      },
      "<50%"
    );
  });

  return (
    <section className="reel">
      <h1 className="super-text" ref={titleRef}>
        Your brand. In Focus
      </h1>

      <div className="reel__content" ref={presenceAnimRef}>
        <p>See our latest reel</p>
        {/* {isStarted && <Vid isStarted={isStarted} />} */}
        <div className="reel__video-wrapper">
          <div className={classNames("reel__video", {
            ["reel__video--playing"]: isStarted
          })}>
            <ReactPlayer
              controls={true}
              url="https://vimeo.com/911568333?color=000000"
              playing={isStarted}
              onPause={() => setIsStarted(false)}
              wrapper="reel__video-wrapper"
            />
          </div>
          {!isStarted && (
          <div
            className={classNames("lines", {
              ["hover"]: !isTouch,
            })}
            onClick={() => setIsStarted(true)}
          >
            <span className="line line-1" />
            <span className="line line-2" />
            <span className="line line-3" />
            <span className="line line-4" />
            <span className="line last-line">Play reel</span>
          </div>
          )}
        </div>
      </div>
    </section>
  );
}

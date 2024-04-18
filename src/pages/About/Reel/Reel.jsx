import React, { useContext, useRef } from "react";

import "./Reel.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/all";

import { DataContext } from "@/helpers/dataHelpers/dataProvider";
import { VideoPlay } from "@/components/VideoPlay/VideoPlay";

export default function Reel() {
  const titleRef = useRef();
  const presenceAnimRef = useRef();

  const { data, isLoading } = useContext(DataContext);

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
  }, [isLoading]);

  return (
    <section className="reel">
      {data && !isLoading && (
        <>
          <h1 className="super-text" ref={titleRef}>
            {data?.reel?.title}
          </h1>

          <div className="reel__content" ref={presenceAnimRef}>
            <p>{data?.reel?.video_title}</p>
            <VideoPlay
              linkUrl={data?.reel?.video}
              buttonText={data?.reel?.play_button_text}
            />
          </div>
        </>
      )}
    </section>
  );
}

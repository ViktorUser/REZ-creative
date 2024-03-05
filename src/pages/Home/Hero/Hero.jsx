import React, { useRef } from "react";
import VideoTrailer from "./Video/Trailers-comp.mp4";

import "./Hero.scss";
import { Logo } from "@/components/Logo/Logo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Hero = () => {
  const timelineName = useRef([]);
  const timelineLine = useRef([]);

  const videoRef = useRef(null);

  useGSAP(() => {
    if (videoRef.current) {
      videoRef.current.onloadeddata = () => {
        const tl = gsap.timeline({
          repeat: -1,
        });

        const tlName = gsap.timeline({
          repeat: -1,
        });

        timelineLine.current.forEach((currLine) => {
          tl.to(currLine, {
            clipPath: "inset(0 0% 0 0)",
            duration: 7.27,
            ease: "none",
          });
        });

        timelineName.current.forEach((currLine, i) => {
          tlName
            .to(currLine, {
              opacity: 1,
              duration: 0.5,
              ease: "none",
            })
            .to(currLine, {
              opacity: 0.4,
              delay: 6.3,
            });
        });
      };
    }
  }, []);

  return (
    <section className="hero">
      <video
        loop
        muted
        autoPlay
        webkit-playsinline="true"
        playsInline
        ref={videoRef}
        className="hero__video-bg"
      >
        <source src={VideoTrailer} />
      </video>

      <div className="hero__bottom">
        <div className="content">
          <div className="timelines">
            <div className="timelines__item">
              <p
                className="timelines__name"
                ref={(n) => timelineName.current.push(n)}
                id="timelinesId1"
              >
                Attack on Titan
              </p>
              <span
                className="timelines__line"
                ref={(n) => timelineLine.current.push(n)}
              />
            </div>
            <div className="timelines__item">
              <p
                className="timelines__name"
                ref={(n) => timelineName.current.push(n)}
              >
                Alien
              </p>
              <span
                className="timelines__line"
                ref={(n) => timelineLine.current.push(n)}
              />
            </div>
            <div className="timelines__item">
              <p
                className="timelines__name"
                ref={(n) => timelineName.current.push(n)}
              >
                Rainbow Six Siege
              </p>
              <span
                className="timelines__line"
                ref={(n) => timelineLine.current.push(n)}
              />
            </div>
          </div>
          <div className="hero__logo">
            <Logo />
          </div>
          <div className="timelines timelines__bottom">
            <p className="timelines__name">Team Deathmatch Trailer</p>
            <p className="timelines__name">CGI Trailer</p>
            <p className="timelines__name">Cinematic Trailer</p>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useContext, useEffect, useRef, useState } from "react";

import "./Hero.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { LoaderContext } from "@/components/Loader/LoaderContext";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";
import classNames from "classnames";
import { motion } from "framer-motion";
import { TimelineAnim } from "@/helpers/anim";

export const Hero = () => {
  const { loaderFinished, setLoaderFinished } = useContext(LoaderContext);

  const { data, isLoading } = useContext(DataContext);

  const [currentVideo, setCurrentVideo] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState([]);

  const timelineName = useRef([]);
  const timelineLine = useRef([]);

  const videoRef = useRef();
  const canvasRef = useRef();

  // useGSAP(() => {
  //   if (videoRef.current) {
  //     videoRef.current.onloadeddata = () => {
  //       const tl = gsap.timeline({
  //         repeat: -1,
  //       });

  //       const tlName = gsap.timeline({
  //         repeat: -1,
  //       });

  //       timelineLine.current.forEach((currLine) => {
  //         tl.to(currLine, {
  //           clipPath: "inset(0 0% 0 0)",
  //           duration: 5,
  //           ease: "none",
  //         });
  //       });

  //       timelineName.current.forEach((currLine, i) => {
  //         tlName
  //           .to(currLine, {
  //             opacity: 1,
  //             duration: 0.5,
  //             ease: "none",
  //           })
  //           .to(currLine, {
  //             opacity: 0.9,
  //             delay: 4,
  //           });
  //       });
  //     };
  //   }
  // }, []);

  useEffect(() => {
    if (!isLoading && videoRef) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.imageSmoothingEnabled = false;

      const loop = () => {
        if (!video.paused && !video.ended) {
          const scaleWidth = 80;
          const scaleHeight = 45;

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          ctx.drawImage(video, 0, 0, scaleWidth, scaleHeight);

          ctx.drawImage(
            canvas,
            0,
            0,
            scaleWidth,
            scaleHeight,
            0,
            0,
            canvas.width,
            canvas.height
          );

          setTimeout(loop, 1000 / 60);
        }
      };

      video.addEventListener("play", loop, 0);

      return () => {
        video.removeEventListener("play", loop);
      };
    }
  }, [isLoading, videoRef]);

  // // Preload videos
  useEffect(() => {
    const loadVideos = data.hero.map((videoUrl) => {
      const video = document.createElement("video");
      video.src = videoUrl.video;
      return video;
    });
    setLoadedVideos(loadVideos);
  }, [data]);

  useEffect(() => {
    const video = videoRef.current;
    video.src = loadedVideos[currentVideo]?.src;

    const handleEnded = () => {
      setCurrentVideo((currentVideo + 1) % loadedVideos.length);
    };

    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [currentVideo, loadedVideos, isLoading]);

  // console.log(loadedVideos[currentVideo].duration);

  useEffect(() => {
    console.log(loadedVideos[currentVideo]?.src.split("http://localhost:5173")[1] + " -------- " + data.hero[currentVideo].video);
    console.log(loadedVideos[currentVideo]?.duration);
  }, [currentVideo])

  return (
    !isLoading && (
      <section className="hero">
        <video
          // loop
          muted
          autoPlay
          webkit-playsinline="true"
          playsInline
          ref={videoRef}
          className="hero__video-bg"
        >
          {/* <source src="/media/Video/Trailers.mp4" /> */}
        </video>

        <div className="hero__logo">
          <canvas
            id="canvasElement"
            className="hero__logo-canvas"
            ref={canvasRef}
          ></canvas>
        </div>

        <div className="hero__bottom">
          <div className="content">
            <div className="timelines">
              {data.hero.map((currV, i) => (
                <div
                  className="timelines__item"
                  key={`timeline-${currV.name}--${i}`}
                  ref={(n) => timelineName.current.push(n)}
                >
                  <p
                    className="timelines__name"
                    // ref={(n) => timelineName.current.push(n)}
                  >
                    {currV.name}
                  </p>
                  <motion.span
                    className="timelines__line"
                    variants={TimelineAnim.lines}
                    initial="initial"
                    animate={loadedVideos[currentVideo]?.src.split("http://localhost:5173")[1] === currV.video ? "aninate" : "initial"} 
                    custom={loadedVideos[currentVideo]?.duration}
                    // ref={(n) => timelineLine.current.push(n)}
                  />
                  {/* <span
                    className={classNames("timelines__line", {
                      "timelines__line--active": loadedVideos[currentVideo]?.src.split("http://localhost:5173")[1] === currV.video
                    })}
                    ref={(n) => timelineLine.current.push(n)}
                  /> */}
                  <p className="timelines__name timelines__category">
                    {currV.category}
                  </p>
                </div>
              ))}
              {/* <div
                className="timelines__item"
                ref={(n) => timelineName.current.push(n)}
              >
                <p
                  className="timelines__name"
                  // ref={(n) => timelineName.current.push(n)}
                  id="timelinesId1"
                >
                  Attack on Titan
                </p>
                <span
                  className="timelines__line"
                  ref={(n) => timelineLine.current.push(n)}
                />
                <p className="timelines__name timelines__category">
                  Team Deathmatch Trailer
                </p>
              </div>
              <div
                className="timelines__item"
                ref={(n) => timelineName.current.push(n)}
              >
                <p
                  className="timelines__name"
                  // ref={(n) => timelineName.current.push(n)}
                >
                  Alien
                </p>
                <span
                  className="timelines__line"
                  ref={(n) => timelineLine.current.push(n)}
                />
                <p className="timelines__name timelines__category">
                  CGI Trailer
                </p>
              </div>
              <div
                className="timelines__item"
                ref={(n) => timelineName.current.push(n)}
              >
                <p
                  className="timelines__name"
                  // ref={(n) => timelineName.current.push(n)}
                >
                  Rainbow Six Siege
                </p>
                <span
                  className="timelines__line"
                  ref={(n) => timelineLine.current.push(n)}
                />
                <p className="timelines__name timelines__category">
                  Cinematic Trailer
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    )
  );
};

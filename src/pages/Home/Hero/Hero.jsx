import React, { useContext, useEffect, useRef, useState } from "react";

import "./Hero.scss";
import { LoaderContext } from "@/components/Loader/LoaderContext";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { anim, TimelineAnim } from "@/helpers/anim";
import ReactPlayer from "react-player";

export const Hero = () => {
  const { loaderFinished, setLoaderFinished } = useContext(LoaderContext);

  const { data, isLoading } = useContext(DataContext);

  const [currentVideo, setCurrentVideo] = useState(0);
  const [videoArray, setVideoArray] = useState([]);
  const [isInitial, setIsInitial] = useState(true);

  const timelineName = useRef([]);

  const canvasRef = useRef();

  const currentVideoRef = useRef(currentVideo);

  useEffect(() => {
    currentVideoRef.current = currentVideo;
  }, [currentVideo]);

  useEffect(() => {
    if (videoArray[currentVideo]) {
      videoArray[currentVideo].oncanplaythrough = () => {
        console.log("Video can play through without interruption.");
      };
    }
  }, [videoArray, currentVideo]);

  useEffect(() => {
    const observer = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          const videos = document.querySelectorAll(".hero__video-bg div video");
          setVideoArray(videos);
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isLoading && videoArray.length) {
      const videos = document.querySelectorAll(".hero__video-bg div video");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.imageSmoothingEnabled = false;

      const loop = () => {
        if (
          videos[currentVideoRef.current] &&
          videos[currentVideoRef.current].readyState === 4 &&
          !videos[currentVideoRef.current].paused &&
          !videos[currentVideoRef.current].ended
        ) {
          const scaleWidth = 80;
          const scaleHeight = 45;

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          ctx.drawImage(videos[currentVideoRef.current], 0, 0, scaleWidth, scaleHeight);

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
        }

        setTimeout(loop, 1000 / 60);
      };

      if (videos[currentVideoRef.current]) {
        videoArray[currentVideoRef.current].oncanplaythrough = () => {
          videos[currentVideoRef.current].addEventListener("play", loop, 0);
        };
        videos[currentVideoRef.current].addEventListener("ended", () => {
          setCurrentVideo((currentVideoRef.current + 1) % videos.length);
        });

        // console.log(`canvas currentVideo -- ${currentVideo}`);
      }

      return () => {
        if (videos[currentVideoRef.current]) {
          videos[currentVideoRef.current].removeEventListener("play", loop);
          videos[currentVideoRef.current].removeEventListener("ended", () => {
            setCurrentVideo((currentVideoRef.current + 1) % videos.length);
          });
        }
      };
    }
  }, [isLoading, videoArray, currentVideo, currentVideoRef.current]);

  useEffect(() => {
    if (currentVideo === 0) {
      setIsInitial(true);
      setTimeout(() => {
        setIsInitial(false);
      }, 100);
    }
  }, [currentVideo]);

  return (
    data && (
      <section className="hero">
        <div className="hero__video-bg">
          {data.hero.map((currV, i) => (
            <div
              className={classNames("video-bg__wrapper", {
                "video-bg__wrapper--active": currentVideo === i,
              })}
              key={`player-hero-video--${currV.name}_${i}`}
            >
              <ReactPlayer
                autoPlay
                controls={false}
                playing={currentVideo === i}
                muted
                playsinline
                loop={data.hero.length === 1}
                url={currV.video}
                width="100%"
                height="100%"
                className="video-bg"
              />
            </div>
          ))}
        </div>

        <div className="hero__logo">
          <canvas
            id="canvasElement"
            className="hero__logo-canvas"
            ref={canvasRef}
          ></canvas>
        </div>

        <div
          className={classNames("hero__bottom", {
            "hero__bottom--empty": data.hero.length === 1,
          })}
        >
          <div className="content">
            <div className="timelines">
              {data.hero.length !== 1 &&
                data.hero.map((currV, i) => (
                  <div
                    className="timelines__item"
                    key={`timeline-${currV.name}--${i}`}
                    ref={(n) => timelineName.current.push(n)}
                  >
                    <p
                      className={classNames("timelines__name", {
                        "timelines__name--active": currentVideo === i,
                      })}
                    >
                      {currV.name}
                    </p>
                    <motion.span
                      className="timelines__line"
                      variants={TimelineAnim.lines}
                      initial="initial"
                      animate={
                        currentVideo === i && !isInitial
                          ? "aninate"
                          : isInitial
                          ? "initial"
                          : currentVideo > i ||
                            (i === 0 && currentVideo === 0 && "exit")
                      }
                      custom={videoArray[currentVideo]?.duration || 5}
                    />
                    <p
                      className={classNames(
                        "timelines__name timelines__category",
                        {
                          "timelines__name--active": currentVideo === i,
                        }
                      )}
                    >
                      {currV.category}
                    </p>
                  </div>
                ))}
            </div>
          </div>
          <div className="mobile">
            <div className="timelines container">
              <AnimatePresence mode="wait">
                <motion.h3
                  {...anim(TimelineAnim.names.Mobile)}
                  key={`${data.hero[currentVideo]?.name}`}
                >
                  {data.hero[currentVideo]?.name}
                </motion.h3>
                <motion.p
                  {...anim(TimelineAnim.names.Mobile)}
                  key={`${data.hero[currentVideo]?.category}`}
                  custom={0.1}
                  className="upperCase semiBold"
                >
                  {data.hero[currentVideo]?.category}
                </motion.p>
              </AnimatePresence>

              <div className="timelines__lines">
                {data.hero.map((_, i) => (
                  <div className="timelines__wrapper">
                    <motion.span
                      className="timelines__line timelines__line--mobile"
                      variants={TimelineAnim.lines}
                      initial="initial"
                      animate={
                        currentVideo === i && !isInitial
                          ? "aninate"
                          : isInitial
                          ? "initial"
                          : currentVideo > i ||
                            (i === 0 && currentVideo === 0 && "exit")
                      }
                      custom={videoArray[currentVideo]?.duration}
                    />
                    <span className="timelines__line--empty" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

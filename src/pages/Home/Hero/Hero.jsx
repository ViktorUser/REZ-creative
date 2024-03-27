import React, { useContext, useEffect, useRef, useState } from "react";

import "./Hero.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { LoaderContext } from "@/components/Loader/LoaderContext";

const videos = [
  "/media/Video/AOT.mp4",
  "/media/Video/Alien.mp4",
  "/media/Video/Rainbow_six.mp4",
];

export const Hero = () => {
  const { loaderFinished, setLoaderFinished } = useContext(LoaderContext);


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
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.imageSmoothingEnabled = false;

    const loop = () => {
      if (!video.paused && !video.ended) {
        const scaleWidth = 80;
        const scaleHeight = 45;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(video, 0, 0, scaleWidth, scaleHeight);

        ctx.drawImage(canvas, 0, 0, scaleWidth, scaleHeight, 0, 0, canvas.width, canvas.height);

        setTimeout(loop, 1000 / 60);
      }
    };

    video.addEventListener('play', loop, 0);

    return () => {
      video.removeEventListener('play', loop);
    };
  }, []);


  // // Preload videos
  // useEffect(() => {
  //   const loadVideos = videos.map(videoUrl => {
  //     const video = document.createElement('video');
  //     video.src = videoUrl;
  //     return video;
  //   });
  //   setLoadedVideos(loadVideos);
  // }, [videos]);

  // useEffect(() => {
  //   const video = videoRef.current;
  //   video.src = loadedVideos[currentVideo]?.src;

  //   const handleEnded = () => {
  //     setCurrentVideo((currentVideo + 1) % loadedVideos.length);
  //   };

  //   video.addEventListener("ended", handleEnded);
  //   return () => {
  //     video.removeEventListener("ended", handleEnded);
  //   };
  // }, [currentVideo, loadedVideos]);

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
        <source src="/media/Video/Trailers.mp4" />
      </video>

      <div className="hero__logo">
        {/* <video
          loop
          muted
          autoPlay
          webkit-playsinline="true"
          playsInline
          ref={videoRef}
          className="hero__logo-video"
        >
          <source src={VideoTrailerPixels} />
        </video> */}
        <canvas id="canvasElement" className="hero__logo-canvas" ref={canvasRef}></canvas>
      </div>

      <div className="hero__bottom">
        <div className="content">
          <div className="timelines">
            <div className="timelines__item"
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
            <p className="timelines__name timelines__category">Team Deathmatch Trailer</p>
            </div>
            <div className="timelines__item"
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
            <p className="timelines__name timelines__category">CGI Trailer</p>

            </div>
            <div className="timelines__item"
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
            <p className="timelines__name timelines__category">Cinematic Trailer</p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

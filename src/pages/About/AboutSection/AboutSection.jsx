import { motion, useScroll, useTransform } from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from "react";

import "./AboutSection.scss";
import { AboutSlider } from "./AboutSlider/AboutSlider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";

export default function AboutSection() {
  const container = useRef();
  const presenceAnimRef = useRef();
  const [words, setWords] = useState([]);

  const { data, isLoading } = useContext(DataContext);

  const { scrollYProgress } = useScroll({
    target: !isLoading && container,
    offset: ["start 0.9", "start 0.40"],
  });

  useEffect(() => {
    if (!isLoading) {
      setWords(data?.about?.title.split(" "));
    }
  }, [isLoading, data]);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 1 });

    tl.fromTo(
      presenceAnimRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
      }
    );
  }, [isLoading]);

  return (
    <section className="about-section" ref={presenceAnimRef}>
      {data && !isLoading && (
        <>
          <div className="top">
            <p>{data?.about?.subtitle}</p>
            <h2 ref={container} className="about-section__title">
              {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                  <Word key={i} progress={scrollYProgress} range={[start, end]}>
                    {word}
                  </Word>
                );
              })}
            </h2>
          </div>
        </>
      )}
      <AboutSlider />
    </section>
  );
}

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="word">
      <span className="word__shadow">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

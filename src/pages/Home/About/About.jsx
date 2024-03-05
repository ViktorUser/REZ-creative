import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import "./About.scss";
import { Slider } from "./Slider/Slider";

const titleText =
  "We are a creative studio specialized in gaming. We blend narrative and visuals to make your game stand out.";

export default function About() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = titleText.split(" ");

  return (
    <section className="about">
      <h1 className="about__title" ref={container}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </h1>
      <Slider />
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

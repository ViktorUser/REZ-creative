import React, { useContext, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import "./About.scss";
import { Slider } from "./Slider/Slider";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";

export default function About() {
  const container = useRef();
  const [words, setWords] = useState([]);

  const { data, isLoading } = useContext(DataContext);

  const { scrollYProgress } = useScroll({
    target: !isLoading && container,
    offset: ["start 0.9", "start 0.25"],
  });

  useEffect(() => {
    if (!isLoading) {
      setWords(data.about.title.split(" "));
    }
  }, [isLoading, data]);

  return !isLoading && (
    <section className="about">
      {/* {!isLoading && ( */}
        <>
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
        </>
      {/* )} */}
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

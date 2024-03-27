import React from "react";
import { motion } from "framer-motion";

import { Hero } from "./Hero/Hero";
import About from "./About/About";
import { motionParametr } from "@/helpers/motionParametr";
import WorksTop from "./WorksTop/WorksTop";
import Works from "./Works/Works";
import Partners from "./Partners/Partners";

export default function Home() {
  return (
    <>
      <motion.main
        {...motionParametr}
        className="home"
      >
        <Hero />
        {/* <div style={{ paddingBottom: '120lvh' }}></div> */}
        <About />
        <WorksTop />
        <Works />
        <Partners />
      </motion.main>
    </>
  );
}

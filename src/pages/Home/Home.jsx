import React from "react";
import { motion } from "framer-motion";

import { Hero } from "./Hero/Hero";
import About from "./About/About";
import { Footer } from "@/components/Footer/Footer";
import { motionParametr } from "@/helpers/motionParametr";

export default function Home() {
  return (
    <>
      <motion.main
        {...motionParametr}
        className="home"
      >
        <Hero />
        <About />
        <Footer />
      </motion.main>
    </>
  );
}

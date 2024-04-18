import { PageTransition, anim } from "@/helpers/anim";
import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import "./PageLayout.scss";
import { useLocation, useSearchParams } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const colors = ["#ff7215", "#82c5ff", "#feb200", "#d333ea", "#00A79D"];

export const PageLayout = ({ children }) => {
  const [isHomePage, setIsHomePage] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  const { data, isLoading } = useContext(DataContext);

  const lastPickedColors = useRef([])

  useEffect(() => {
    ScrollTrigger.refresh(true)
  }, [isLoading, pathname])

  function getRandomColor() {
    let color;
    do {
      color = colors[Math.floor(Math.random() * colors.length)];
    } while (lastPickedColors.current.includes(color));
  
    // Update the last picked colors
    lastPickedColors.current.push(color);
    if (lastPickedColors.current.length > 2) { // or 3, if you want to ensure a color isn't repeated for 3 turns
      lastPickedColors.current.shift(); // remove the oldest color
    }
  
    return color;
  }

  const slideColor = getRandomColor();

  useEffect(() => {
    if (pathname === "/") {
      setIsHomePage(true);

      setTimeout(() => {
        setIsHomePage(false);
      }, 1550);
    }
  }, [location]);

  return (
    <div className="inner">
      <Header />
      <motion.div
        className="page-slide"
        style={{ borderColor: slideColor }}
        {...anim(PageTransition.slide)}
        custom={isHomePage}
      >
        {isHomePage && (
          <video
            loop
            muted
            webkit-playsinline="true"
            playsInline
            className="page-slide__video"
          >
            <source src="/media/Video/Trailers.mp4" />
          </video>
        )}
      </motion.div>
      <motion.div className="page" {...anim(PageTransition.perspective)}>
        <motion.div {...anim(PageTransition.opacity)}>{children}</motion.div>
        <Footer />
      </motion.div>
    </div>
  );
};

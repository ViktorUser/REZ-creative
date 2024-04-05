import { PageTransition, anim } from "@/helpers/anim";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import "./InnerTransition.scss";
import { useLocation } from "react-router-dom";

const colors = ["#ff7215", "#82c5ff", "#feb200", "#d333ea", "#00A79D"];

export const InnerTransition = ({ children }) => {
  const [isHomePage, setIsHomePage] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  const lastPickedColors = useRef([])

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
      <motion.div
        className="slide"
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
            className="slide__video"
          >
            <source src="/media/Video/Trailers.mp4" />
          </video>
        )}
      </motion.div>
      <motion.div className="page" {...anim(PageTransition.perspective)}>
        <motion.div {...anim(PageTransition.opacity)}>{children}</motion.div>
      </motion.div>
    </div>
  );
};

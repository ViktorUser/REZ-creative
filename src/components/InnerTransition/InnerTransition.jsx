import { PageTransition, anim } from "@/helpers/anim";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import "./InnerTransition.scss";
import { useLocation } from "react-router-dom";

export const InnerTransition = ({ children, slideColor }) => {
  const [isHomePage, setIsHomePage] = useState(false);
  const location = useLocation();
  const { pathname } = location;

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

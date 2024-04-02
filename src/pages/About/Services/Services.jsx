import React, { useEffect, useRef, useState } from "react";
import "./Services.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

import servicesData from "@/data/services.json";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { anim, servicesListAnim } from "@/helpers/anim";

export default function Services() {
  const servicesRef = useRef();
  const servicesImageRef = useRef();

  const [openService, setOpenService] = useState({
    isActive: false,
    indexActive: null,
  });

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.fromTo(
      servicesImageRef.current,
      { scale: 1.3 },
      {
        scale: 0.8,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );
  });

  const handlerClickedServ = (index) => {
    setOpenService({
      isActive: !(openService.isActive && openService.indexActive === index),
      indexActive: index,
    });
  };

  const mobileServicesClassHandler = (ind) => {
    return classNames("semiBold services-list--top__title", {
      ["services-list--top__title--active"]:
        openService.isActive && openService.indexActive === ind,
    });
  };

  return (
    <section className="services container" ref={servicesRef}>
      <img
        src="/media/AboutPage/Services.jpg"
        alt="top services"
        className="services__image"
        ref={servicesImageRef}
      />

      <div className="services__content">
        <h1 className="super-text">Services</h1>

        <div className="services-list__wrapper services-list__wrapper--top">
          {servicesData[0].top.map((curr, i) => (
            <div
              className="services-list services-list--top"
              key={`services-list__${i}`}
            >
              <p
                className={"semiBold services-list--top__title"}
                onClick={() => handlerClickedServ(i)}
              >
                {curr.title}
              </p>
              <ul className="services-list__list smallText shadow">
                {curr.services.map((currServ, index) => (
                  <li key={`services-list__${i}-${index}-item`}>{currServ}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="services-list__wrapper services-list__wrapper--mobile services-list__wrapper--top ">
          {servicesData[0].top.map((curr, i) => (
            <div
              className="services-list services-list--top"
              key={`services-list__${i}`}
            >
              <p
                className={mobileServicesClassHandler(i)}
                onClick={() => handlerClickedServ(i)}
              >
                {curr.title}
              </p>
              <AnimatePresence>
                <motion.ul
                  variants={servicesListAnim.listPresence}
                  initial="initial"
                  animate={
                    openService.isActive && openService.indexActive === i
                      ? "animate"
                      : "exit"
                  }
                  className="services-list__list smallText shadow"
                >
                  {curr.services.map((currServ, index) => (
                    <li key={`services-list__${i}-${index}-item`}>{currServ}</li>
                  ))}
                </motion.ul>
              </AnimatePresence>

              {/* <AnimatePresence mode="wait">
                {(openService.isActive && openService.indexActive === i) && (
                  <motion.ul
                    {...anim(servicesListAnim.listPresence)}
                    className="services-list__list smallText shadow"
                  >
                    {curr.services.map((currServ, index) => (
                      <li key={`services-list__${i}-${index}-item`}>{currServ}</li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence> */}
            </div>
          ))}
        </div>

        <div className="services-list__wrapper services-list--main">
          {servicesData[0].main.map((currServMain, ind) => (
            <div className="services-list" key={`services-list--main-${ind}`}>
              <p className="semiBold">{currServMain.title}</p>
              <span className="smallText shadow services-list__service">
                {currServMain.service}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

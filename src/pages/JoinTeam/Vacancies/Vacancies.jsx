import React, { useRef } from "react";
import "./Vacancies.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import vacanciesListData from "@/data/vacancies.json";
import { useInView } from "react-intersection-observer";
import { VacancyAnim } from "@/helpers/anim";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Vacancies() {
  const presenceAnimRef = useRef();

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
  });

  return (
    <section className="vacancies container" ref={presenceAnimRef}>
      <h1 className="super-text vacancies__title">Vacancies</h1>

      <div className="vacancies__table">
        <div className="top">
          <p className="shadow positions">
            Current positions — {vacanciesListData.length}
          </p>
          <p className="shadow deadline" data-hide-for-mobile>Deadline</p>
        </div>

        <ul className="vacancies__list">
          {vacanciesListData.map((currVac, i) => (
            <li key={i}>
              <Vacancy vacancy={currVac} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const Vacancy = ({ vacancy, index }) => {
  const { title, deadline, category } = vacancy;

  const [dayWithSuffix, month, year] = deadline.split(" ");
  const match = dayWithSuffix.match(/(\d+)(st|nd|rd|th)/);
  const [day, suffix] = match ? match.slice(1) : [dayWithSuffix, ""];

  // const shortMouth = month.slice(0, 3);

  const classCategory = category.toLocaleLowerCase().split(" ").join("-");

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 1,
  });

  const shortMouth = month && month.slice(0, 3)

  return (
    <Link to="" className="vacancy" ref={ref}>
      <motion.div
        className="vacancy__content"
        custom={index}
        variants={VacancyAnim.vacancyContent}
        initial="initial"
        animate={inView ? "enter" : "initial"}
      >
        <h2 className="vacancy__title">{title}</h2>
        <p className="upperCase semiBold vacancy__deadline" data-only-desktop--flex>
          <h3 className="upperCase semiBold">{day}</h3>
          <span>
            {suffix} {month} {year}
          </span>
        </p>
        <div className="vacancy__deadline vacancy__deadline-wrapper">
        <p className="shadow vacancy__deadline-title" data-only-mobile>Deadline</p>
          <p className="upperCase semiBold vacancy__deadline" data-not-desktop--flex>
            <h3 className="upperCase semiBold">{day}</h3>
            <span>
              {suffix} {shortMouth} {year}
            </span>
          </p>
        </div>
        <span
          className={`vacancy__cathegory vacancy__cathegory--${classCategory}`}
        >
          {category}
        </span>
      </motion.div>
      <motion.span
        className="vacancy__line"
        custom={index}
        variants={VacancyAnim.line}
        initial="initial"
        animate={inView ? "enter" : "initial"}
      />
    </Link>
  );
};

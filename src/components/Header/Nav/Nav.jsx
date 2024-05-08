import React, { useContext } from "react";
import "./Nav.scss";
import { motion } from "framer-motion";
import { MenuAnim, anim } from "@/helpers/anim";
import { Link } from "react-router-dom";
import AnchorLink from "@/components/AnchorLink/AnchorLink";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";

export const Nav = ({ setisActive }) => {
  const { data, isLoading } = useContext(DataContext);

  return (
    <motion.div className="navigation" {...anim(MenuAnim.presenceMenu)}>
      <nav className="navigation__list container">
        <h1 className="navigation__link-wrapper super-text">
          <motion.span
            href="/"
            className="navigation__link"
            {...anim(MenuAnim.links)}
            custom={[1 * 0.1, 1 * 0.01]}
          >
            <Link to="/work" className="navigation__link" onClick={() => setisActive(false)}>
              Work
            </Link>
          </motion.span>
        </h1>
        <h1 className="navigation__link-wrapper super-text">
          <motion.span
            href="/"
            className="navigation__link"
            {...anim(MenuAnim.links)}
            custom={[2 * 0.1, 2 * 0.01]}
          >
            <Link to="/about" className="navigation__link" onClick={() => setisActive(false)}>
              About us
            </Link>
          </motion.span>
        </h1>
        <h1 className="navigation__link-wrapper super-text">
          <motion.span
            href="/"
            className="navigation__link"
            {...anim(MenuAnim.links)}
            custom={[3 * 0.1, 3 * 0.01]}
            onClick={() => setisActive(false)}
          >
            
            <AnchorLink toSection="#contact-us" className="navigation__link">
              Contact us
            </AnchorLink>
          </motion.span>
        </h1>
        <h1 className="navigation__link-wrapper super-text">
          <motion.span
            href="/"
            className="navigation__link link-with-arrow"
            {...anim(MenuAnim.links)}
            custom={[4 * 0.1, 4 * 0.01]}
          >
            <Link to="/vacancies" className="navigation__link" onClick={() => setisActive(false)}>
              Join our team
            </Link>
          </motion.span>
        </h1>
      </nav>

      <motion.div className="socials container" {...anim(MenuAnim.socials)}>
        <p className="shadow">Follow us</p>

        <ul className="socials__list">
        {data?.socials && data?.socials?.links.map((currSocial, i) => (
          <li className="socials__item" key={`socials__item-${i}`}>
            <a href={currSocial.link} target="_blank">
              <img src={currSocial.icon} alt="socials" />
            </a>
          </li>
        ))}        </ul>
      </motion.div>
    </motion.div>
  );
};

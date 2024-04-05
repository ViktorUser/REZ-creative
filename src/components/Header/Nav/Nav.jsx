import React from "react";
import "./Nav.scss";
import { motion } from "framer-motion";
import { MenuAnim, anim } from "@/helpers/anim";
import { Link } from "react-router-dom";

export const Nav = ({ setisActive }) => {
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
          <motion.a
            href="/"
            className="navigation__link"
            {...anim(MenuAnim.links)}
            custom={[2 * 0.1, 2 * 0.01]}
          >
            <Link to="/about" className="navigation__link" onClick={() => setisActive(false)}>
              About us
            </Link>
          </motion.a>
        </h1>
        <h1 className="navigation__link-wrapper super-text">
          <motion.a
            href="/"
            className="navigation__link"
            {...anim(MenuAnim.links)}
            custom={[3 * 0.1, 3 * 0.01]}
          >
            <Link to="/contact" className="navigation__link" onClick={() => setisActive(false)}>
              Contact us
            </Link>
          </motion.a>
        </h1>
        <h1 className="navigation__link-wrapper super-text">
          <motion.a
            href="/"
            className="navigation__link link-with-arrow"
            {...anim(MenuAnim.links)}
            custom={[4 * 0.1, 4 * 0.01]}
          >
            <Link to="/vacancies" className="navigation__link" onClick={() => setisActive(false)}>
              Join our team
            </Link>
          </motion.a>
        </h1>
      </nav>

      <motion.div className="socials container" {...anim(MenuAnim.socials)}>
        <p className="shadow">Follow us</p>

        <ul className="socials__list">
          <li className="socials__item">
            <a href="https://vimeo.com/rezcreative">
              <img src="/media/Socials/Vimeo.svg" alt="" />
            </a>
          </li>
          <li className="socials__item">
            <a href="https://www.instagram.com/rezcreative/">
              <img src="/media/Socials/Instagram.svg" alt="" />
            </a>
          </li>
          <li className="socials__item">
            <a href="https://www.facebook.com/Rezcreative/">
              <img src="/media/Socials/FB.svg" alt="" />
            </a>
          </li>
          <li className="socials__item">
            <a href="https://www.linkedin.com/company/rez-creative/?originalSubdomain=ca">
              <img src="/media/Socials/Linkedin.svg" alt="" />
            </a>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

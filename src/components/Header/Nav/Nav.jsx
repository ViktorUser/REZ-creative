import React from "react";
import "./Nav.scss";
import { motion } from "framer-motion";
import { MenuAnim, anim } from "@/helpers/anim";

export const Nav = () => {
  return (
    <motion.div className="navigation" {...anim(MenuAnim.presenceMenu)}>
      <nav className="navigation__list container">
        <h1 className="navigation__link-wrapper super-text">
          <motion.a
            href="/"
            className="navigation__link"
            {...anim(MenuAnim.links)}
            custom={[1 * 0.1, 1 * 0.01]}
          >
            Work
          </motion.a>
        </h1>
        <h1 className="navigation__link-wrapper super-text">
          <motion.a
            href="/"
            className="navigation__link"
            {...anim(MenuAnim.links)}
            custom={[2 * 0.1, 2 * 0.01]}
          >
            About us
          </motion.a>
        </h1>
        <h1 className="navigation__link-wrapper super-text">
          <motion.a
            href="/"
            className="navigation__link"
            {...anim(MenuAnim.links)}
            custom={[3 * 0.1, 3 * 0.01]}
          >
            Contact us
          </motion.a>
        </h1>
        <h1 className="navigation__link-wrapper super-text">
          <motion.a
            href="/"
            className="navigation__link link-with-arrow"
            {...anim(MenuAnim.links)}
            custom={[4 * 0.1, 4 * 0.01]}
          >
            Join our team
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

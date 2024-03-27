import React from 'react';

import './Socials.scss';

export const Socials = () => {
  return (
    <div className="socials">
      <h4>Follow us</h4>

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
    </div>
  )
}

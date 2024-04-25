import React, { useContext } from "react";

import "./Socials.scss";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";

export const Socials = () => {
  const { data, isLoading } = useContext(DataContext);

  return !isLoading && (
    <div className="socials">
      <h4>{data.socials.title}</h4>

      <ul className="socials__list">
        {data.socials.links.map((currSocial, i) => (
          <li className="socials__item" key={`socials__item-${i}`}>
            <a href={currSocial.link}>
              <img src={currSocial.icon} alt="socials" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

import React, { useState } from "react";

import worksList from "./worksList.json";

import "./Works.scss";
import { BorderButton } from "@/components/Button/BorderButton/BorderButton";
import { CardProject } from "@/components/CardProject/CardProject";

export default function Works() {
  return (
    <section className="works container">
      <p>Selected works</p>

      <ul className="works__list">
        {worksList.slice(0, 8).map((currW, i) => (
          <CardProject
            key={`card-works-home-${i}`}
            srcBg={currW.mainImage}
            srcBgZoomed={currW.zoomedImage}
            srcLogo={currW.logo}
          />
        ))}
        <div className="works__button">
          <BorderButton href="/">More work</BorderButton>
        </div>
      </ul>
    </section>
  );
}

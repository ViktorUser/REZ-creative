import React, { useContext, useState } from "react";

import "./Works.scss";
import { BorderButton } from "@/components/Button/BorderButton/BorderButton";
import { CardProject } from "@/components/CardProject/CardProject";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";

export default function Works() {
  const { data, isLoading } = useContext(DataContext);

  return !isLoading && (
    <section className="works container">
      <p>Selected works</p>

      <ul className="works__list">
        {data.works.works.slice(0, 8).map((currW, i) => (
          <CardProject
            key={`card-works-home-${i}`}
            project={currW}
          />
        ))}
        <div className="works__button">
          <BorderButton href="/work">More work</BorderButton>
        </div>
      </ul>
    </section>
  );
}

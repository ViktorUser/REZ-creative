import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useContext, useEffect, useRef } from "react";
import './Partners.scss';
import { useGSAP } from "@gsap/react";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";

export default function Partners() {
  const { data, isLoading } = useContext(DataContext);

  return !isLoading && (
    <section className="partners">
      <div className="partners__slider">
        <div className="partners__slider-wrapper" style={{ animationDuration: `${data.partners.logos.length + 6}s` }}>
          {data.partners.logos.map((currLogo, i) => (
            <img
              alt=""
              key={`partners-logo--${i}`}
              className="partners__logo"
              src={currLogo}
            />
          ))}
        </div>
        <div className="partners__slider-wrapper"  style={{ animationDuration: `${data.partners.logos.length + 6}s` }}>
          {data.partners.logos.map((currLogo, i) => (
            <img
              alt=""
              key={`partners-logo--${i}`}
              className="partners__logo"
              src={currLogo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

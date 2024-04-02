import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.scss";
import { InnerTransition } from "@/components/InnerTransition/InnerTransition";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/all";

export default function ErrorPage() {
  const titleRef = useRef();
  const presenceAnimRef = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      titleRef.current,
      {
        yPercent: 20,
        clipPath: "inset(0 0 100% 0)",
      },
      {
        yPercent: -2,
        clipPath: "inset(0 0 0% 0)",
        duration: 1,
        ease: CustomEase.create(
          "custom",
          "M0,0 C0.17,0 0.308,0.115 0.331,0.155 0.389,0.256 0.391,0.359 0.434,0.555 0.478,0.751 0.661,0.877 0.661,0.877 0.661,0.877 0.794,1 1,1 "
        ),
      }
    );

    presenceAnimRef.current.forEach((currElem) => {
      tl.fromTo(
        currElem,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
        },
        0
      );
    });
  });
  return (
    <InnerTransition slideColor="#82c5ff">
      <section className="error-page container">
        <p ref={(el) => presenceAnimRef.current.push(el)}>ERROR 404</p>
        <h1 className="super-text" ref={titleRef}>
          We couldn’t find that page
        </h1>

        <Link
          to="/"
          className="error-page__button"
          ref={(el) => presenceAnimRef.current.push(el)}
          data-hidden
        >
          Go homepage
        </Link>
      </section>
    </InnerTransition>
  );
}

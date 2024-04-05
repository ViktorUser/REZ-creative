import { useRef } from "react";

import "./Form.scss";
import { Socials } from "../Socials/Socials";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { GeneralEnquiresForm } from "./General/General";
import { useLocation } from "react-router-dom";
import { MainForm } from "./Main/Main";

export const FormSend = () => {
  const formRef = useRef();
  const formTitleRef = useRef();
  const formContentRef = useRef();
  const location = useLocation();

  const { pathname } = location;

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: formRef.current,
        start: "top bottom",
        end: "20% bottom",
        scrub: 2,
      },
    });

    gsap.set(formRef.current, {
      scale: 0.9,
    });

    gsap.set(formContentRef.current, {
      scale: 0.85,
    });

    gsap.set(formTitleRef.current, {
      yPercent: 20,
      clipPath: "inset(0 0 100% 0)",
    });

    gsap.to(formContentRef.current, {
      scale: 1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: formRef.current,
        start: "30% bottom",
        end: "45% bottom",
        scrub: 2,
      },
    });

    tl.to(formRef.current, {
      scale: 1,
    });

    tl.to(formTitleRef.current, {
      yPercent: 0,
      clipPath: "inset(0 0 0% 0)",
    });
  });

  return (
    <section className="main-form" ref={formRef}>
      <h1 className="super-text" ref={formTitleRef}>
        {/* {pathname !== "/vacancies" && "Say hello"} */}
        {pathname === "/vacancies" ? "General enquires" : "Say hello"}
      </h1>

      <div className="main-form__content" ref={formContentRef}>
        {/* {pathname !== "/vacancies" && <MainForm />} */}
        {pathname === "/vacancies" ? <GeneralEnquiresForm /> : <MainForm />}
        <Socials />
      </div>
    </section>
  );
};

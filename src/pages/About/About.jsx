import { InnerTransition } from "@/components/InnerTransition/InnerTransition";
import React, { useEffect } from "react";
import Reel from "./Reel/Reel";
import "./About.scss";
import { Footer } from "@/components/Footer/Footer";
import AboutSection from "./AboutSection/AboutSection";
import Services from "./Services/Services";
import Team from "./Team/Team";
import CTA from "./CTA/CTA";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <InnerTransition>
      <main className="about-page">
        <Reel />
        <AboutSection />
        <Services />
        <Team />
        <CTA />
      </main>
      <Footer />
    </InnerTransition>
  );
}

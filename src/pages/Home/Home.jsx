import React, { useEffect } from "react";

import { Hero } from "./Hero/Hero";
import About from "./About/About";
import WorksTop from "./WorksTop/WorksTop";
import Works from "./Works/Works";
import Partners from "./Partners/Partners";
import { InnerTransition } from "@/components/InnerTransition/InnerTransition";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <InnerTransition>
      <main className="home">
        <Hero />
        <About />
        <WorksTop />
        <Works />
        <Partners />
        <Footer />
      </main>
    </InnerTransition>
  );
}

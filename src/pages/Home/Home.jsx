import React from "react";

import { Hero } from "./Hero/Hero";
import About from "./About/About";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <main className="home">
        <Hero />
        <About />
        <Footer />
      </main>
    </>
  );
}

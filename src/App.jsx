import React, { useContext, useState } from "react";
import { ScrollProvider } from "./helpers/scrollProvider";
import Home from "./pages/Home/Home";
import { Loader } from "./components/Loader/Loader";
import { AnimatePresence } from "framer-motion";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import {
  LoaderContext,
  LoaderProvider,
} from "./components/Loader/LoaderContext";

function App() {
  return (
    <main>
      <ScrollProvider>
        <LoaderProvider>
          <AnimatePresence mode="popLayout" initial={false}>
            <Loader />
            <Root />
          </AnimatePresence>
        </LoaderProvider>
      </ScrollProvider>
    </main>
  );
}

const Root = () => {
  const { loaderFinished } = useContext(LoaderContext);

  return loaderFinished && (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
};

export default App;

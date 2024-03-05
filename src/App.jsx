import React, { useState } from "react";
import { ScrollProvider } from "./helpers/scrollProvider";
import Home from "./pages/Home/Home";
import { Loader } from "./components/Loader/Loader";
import { AnimatePresence } from "framer-motion";

function App() {
  const [loaderFinished, setLoaderFinished] = useState(false);

  return (
    <main>
      <ScrollProvider>
        <AnimatePresence mode="popLayout" initial={false}>
          {!loaderFinished ? (
            <Loader setLoaderFinished={setLoaderFinished} />
          ) : (
            <Home />
            )}
        </AnimatePresence>
      </ScrollProvider>
    </main>
  );
}

export default App;

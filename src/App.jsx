import React, { useState } from "react";
import { ScrollProvider } from "./helpers/scrollProvider";
import Home from "./pages/Home/Home";
import { Loader } from "./components/Loader/Loader";
import { motion, AnimatePresence } from "framer-motion";

export const motionParametr = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
};

function App() {
  const [loaderFinished, setLoaderFinished] = useState(false);

  return (
    <main>
      <ScrollProvider>
        <AnimatePresence mode="sync">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: !loaderFinished ? 1 : 0 }}
          >
            <Loader setLoaderFinished={setLoaderFinished} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loaderFinished ? 1 : 0 }}
            >
              <Home/>
            </motion.div>
        </AnimatePresence>
      </ScrollProvider>
    </main>
  );
}

export default App;

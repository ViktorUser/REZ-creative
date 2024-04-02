import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Navigate,
  Routes,
  Route,
  useLocation,
  useRoutes,
} from "react-router-dom";

import { ScrollProvider } from "./helpers/scrollProvider";
import Home from "./pages/Home/Home";
import { Loader } from "./components/Loader/Loader";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import {
  LoaderContext,
  LoaderProvider,
} from "./components/Loader/LoaderContext";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import About from "./pages/About/About";

function App() {
  return (
    <main>
      <ScrollProvider>
        <LoaderProvider>
          <Loader />
          <Root />
        </LoaderProvider>
      </ScrollProvider>
    </main>
  );
}

const Root = () => {
  const { loaderFinished } = useContext(LoaderContext);

  const element = useRoutes([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'about',
          element: <About />,
        },
        // {
        //   path: 'blogs',
        //   children: [
        //     {
        //       path: ":blogId?",
        //       element: <BlogDetails />,
        //     },
        //   ],
        // }
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  const location = useLocation();

  return (
    loaderFinished && (
      <>
        <Header />
          <AnimatePresence mode="wait" initial={false}>
            {React.cloneElement(element, { key: location.pathname })}
          </AnimatePresence>
      </>
    )
  );
};

export default App;

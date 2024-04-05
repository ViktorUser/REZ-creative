import React, { useContext } from "react";
import { AnimatePresence } from "framer-motion";
import {
  useLocation,
  useRoutes,
} from "react-router-dom";

import { ScrollProvider } from "./helpers/scrollProvider";
import Home from "./pages/Home/Home";
import { Loader } from "./components/Loader/Loader";
import { Header } from "./components/Header/Header";
import {
  LoaderContext,
  LoaderProvider,
} from "./components/Loader/LoaderContext";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import About from "./pages/About/About";
import JoinTeam from "./pages/JoinTeam/JoinTeam";

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
        {
          path: 'vacancies',
          element: <JoinTeam />
          // children: [
          //   {
          //     path: ":blogId?",
          //     element: <BlogDetails />,
          //   },
          // ],
        }
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

import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import React, { createContext } from "react";
import { useQuery } from "react-query";
import { URL_HOME_DATA } from "./linksAPI";


const hero = [
  {
    "name": "Attack on Titan",
    "category": "Team Deathmatch Trailer",
    "video": "/media/Video/AOT2.mp4"
  },
  {
    "name": "Rainbow Six Siege",
    "category": "Cinematic Trailer",
    "video": "/media/Video/Rainbow_six.mp4"
  },
  {
    "name": "Alien",
    "category": "CGI Trailer",
    "video": "/media/Video/Alien.mp4"
  }
]

// TODO: DELETE THE HERO CONST

const getData = (url) => {
  return fetch(url, {
    cache: "no-cache"
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      if (url === URL_HOME_DATA) {
        return { ...data, hero}
      }
      return data
    }
  );
};

export const DataContext = createContext();

export const DataProvider = ({ children, url }) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getData(url),
    queryKey: ["data", url],
  });

  return (
    !isLoading && (
      <>
        {!data  ? (
          <ErrorPage />
        ) : (
          <DataContext.Provider value={{ data, isLoading }}>
            {children}
          </DataContext.Provider>
        )}
      </>
    )
  );
};

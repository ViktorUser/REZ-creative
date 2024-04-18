import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import React, { Children, createContext, useEffect } from "react";
import { useQuery } from "react-query";

const getData = (url) => {
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => data);
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
        {!data ? (
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

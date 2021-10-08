import { useState, useCallback } from "react";

/*
    useFetch receives a method (GET, POST, etc), a url to fetch content and optional body.
*/
const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  // using useCallback to memoize the callback
  const fetchData = useCallback(
    async (
      url,
      options = {
        method: "GET",
      }
    ) => {
      let data;
      setIsLoading(true);
      setServerError(null);
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("The data can't be fetched in this moment.");
        }
        data = await response.json();
        setIsLoading(false);
      } catch (error) {
        setServerError(error);
        setIsLoading(false);
      }
      return data;
    },
    []
  );

  return { isLoading, serverError, fetchData };
};

export default useFetch;

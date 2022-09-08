import { useState, useCallback } from "react";

/*
    useFetch receives a method (GET, POST, etc), a url to fetch content and optional body.
*/
const useFetch = () => {
  
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
      setServerError(null);
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("The data can't be fetched in this moment.");
        }
        data = await response.json();
      } catch (error) {
        setServerError(error);
      }
      return data;
    },
    []
  );

  return { serverError, fetchData };
};

export default useFetch;

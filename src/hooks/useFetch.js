import { useState, useCallback } from "react";

/*
    useFetch receives a method (GET, POST, etc), a url to fetch content and optional body.
*/
const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [fetchedData, setFetchedData] = useState([]);

  // using useCallback to memoize the callback
  const fetchData = useCallback(async (url) => {
    setFetchedData([]);
    setIsLoading(true);
    setServerError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("The data can't be fetched in this moment.");
      }
      const data = await response.json();
      setFetchedData(data.features);
      setIsLoading(false);
    } catch (error) {
      setServerError(error);
      setIsLoading(false);
    }
  }, []);

  return { isLoading, serverError, fetchedData, fetchData };
};

export default useFetch;

import { useCallback } from "react";
import useFetch from "./useFetch";

const DOMAIN = 'https://earthquake.usgs.gov/fdsnws/event/1'

const useEventsAPI = () => {

  const { fetchData } = useFetch()

  const getEvent = useCallback(async (params) => {
    try {
      console.log('fetching events...')
      const queryUrl = new URL(`${DOMAIN}/query`)
      Object.keys(params).forEach((key) =>
        queryUrl.searchParams.append(key, params[key])
      );
      return await fetchData(queryUrl)
    } catch (error) {
      return null
    }
  }, [fetchData])
  
  const getEvents = useCallback(async (params, currentPage) => {
    try {
      console.log('fetching events...')
      const queryUrl = new URL(`${DOMAIN}/query`)
      Object.keys(params).forEach((key) =>
      queryUrl.searchParams.append(key, params[key])
      );
      return await fetchData(queryUrl)
    } catch (error) {
      return null
    }
  }, [fetchData])

  const countEvents = useCallback(async (params) => {
    try {
      console.log('counting events...')
      const countUrl = new URL(`${DOMAIN}/count`)
      Object.keys(params).forEach((key) =>
      countUrl.searchParams.append(key, params[key])
      );
      return await fetchData(countUrl)
    } catch (error) {
      return null
    }
  }, [fetchData])

  return { getEvents, countEvents, getEvent };
};

export default useEventsAPI;
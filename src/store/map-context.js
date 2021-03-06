import React from "react";
import { useState, useEffect } from "react";

// creates context instance
const MapContext = React.createContext();

// Wrapper used to provide the context to its child components
export const MapContextProvider = (props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [viewport, setViewport] = useState({
    latitude: -36.33325814457118,
    longitude: -71.39361021304366,
    zoom: 2.5,
  });
  const [bounds, setBounds] = useState({
    minLatitude: "-75.05689251672965",
    maxLatitude: "-14.288953187818608",
    minLongitude: "-95.70302236800661",
    maxLongitude: "-63.227436430506614",
  });

  // set initial date state
  useEffect(() => {
    const startDate = new Date();
    setStartDate(formatInputDate(startDate));
    const endDate = tomorrow(startDate); // here startDate is altered, but not the state
    setEndDate(formatInputDate(endDate));
  }, []);

  // receives a date object an returns date object with one day added.
  const tomorrow = (date) => new Date(date.setDate(date.getDate() + 1));

  // get input formatted date, receives a Date object and returns a 'yyyy-mm-dd' string
  const formatInputDate = (date) => date.toISOString().split("T")[0];
  const updateStartDate = (e) => setStartDate(e.target.value);
  const updateEndDate = (e) => setEndDate(e.target.value);

  const context = {
    viewport,
    setViewport,
    bounds,
    setBounds,
    startDate,
    endDate,
    updateEndDate,
    updateStartDate,
  };

  return (
    <MapContext.Provider value={context}>{props.children}</MapContext.Provider>
  );
};

export default MapContext;

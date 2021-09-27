import { Fragment, useState, useEffect } from "react";
import styles from "./Events.module.css";
import Card from "../components/Card";
import Map from "../components/Map";
import EventsList from "../components/EventsList";
// import { events } from "./dummyData";

function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const isEventsEmpty = events.length <= 0;

  // set initial date state
  useEffect(() => {
    const startDate = new Date();
    setStartDate(formatInputDate(startDate));
    const endDate = tomorrow(startDate); // here startDate is altered, but not the state
    setEndDate(formatInputDate(endDate));
  }, []);

  // send request only the first time the component was rendered
  useEffect(() => {
    if (startDate && endDate) {
      setIsLoading(true);
      setEvents([]);
      const url = new URL("https://earthquake.usgs.gov/fdsnws/event/1/query");
      const params = {
        format: "geojson",
        starttime: startDate,
        endtime: endDate,
        minlatitude: "-75.05689251672965",
        maxlatitude: "-14.288953187818608",
        minlongitude: "-95.70302236800661",
        maxlongitude: "-63.227436430506614",
        orderby: "time",
      };
      // create the url with params
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
      //console.log("fetching all events", url.href);
      fetch(url)
        .then((res) => res.json())
        .then(
          (result) => {
            //console.log(result);
            setEvents(result.features);
            setIsLoading(false);
          },
          (error) => {
            setIsLoading(false);
          }
        );
    }
  }, [startDate, endDate]);

  // receives a date object an returns date object with one day added.
  const tomorrow = (date) => new Date(date.setDate(date.getDate() + 1));

  // get input formatted date, receives a Date object and returns a 'yyyy-mm-dd' string
  const formatInputDate = (date) => date.toISOString().split("T")[0];
  const updateStartDate = (e) => setStartDate(e.target.value);
  const updateEndDate = (e) => setEndDate(e.target.value);

  return (
    <Fragment>
      <div className={styles.main}>
        <h1>Events List</h1>
        <p>Last events tracked by USGS.</p>
      </div>
      <div className={styles["section-one"]}>
        <Card title="Events List">
          <ul>
            <li className={styles["form-control"]}>
              <label> Start date:</label>
              <input
                type="date"
                id="start"
                name="trip-start"
                value={startDate}
                onChange={updateStartDate}
              />
            </li>
            <li className={styles["form-control"]}>
              <label>End date:</label>
              <input
                type="date"
                id="end"
                name="trip-start"
                value={endDate}
                onChange={updateEndDate}
              />
            </li>
          </ul>

          {isEventsEmpty && !isLoading && "There's no events to show."}
          {isLoading && "Loading Data..."}
          {!isEventsEmpty && !isLoading && <EventsList events={events} />}
        </Card>
      </div>
      <div className={styles["section-two"]}>
        <Card title="Events Map" footer="Location: Chile">
          <Map
            events={events}
            zoom={2.5}
            lat={-36.33325814457118}
            lng={-71.39361021304366}
          />
        </Card>
      </div>
    </Fragment>
  );
}

export default Events;

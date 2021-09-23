import { Fragment, useState, useEffect } from "react";
import styles from "./Events.module.css";
import Card from "../components/Card";
import Map from "../components/Map";
import EventsList from "../components/EventsList";
// import { events } from "./dummyData";

function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isEventsEmpty = events.length <= 0;

  // send request only the first time the component was rendered
  useEffect(() => {
    const url = new URL("https://earthquake.usgs.gov/fdsnws/event/1/query");
    const params = {
      format: "geojson",
      starttime: "2021-09-23",
      endtime: "2021-09-24",
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
    console.log("fetching all events");
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoading(false);
          setEvents(result.features);
        },
        (error) => {
          setIsLoading(false);
        }
      );
  }, []);

  return (
    <Fragment>
      <div className={styles.main}>
        <h1>Events List</h1>
        <p>Last events tracked by USGS.</p>
      </div>
      <div className={styles["section-one"]}>
        <Card title="Events List">
          {isEventsEmpty && "There's no events to show."}
          {!isEventsEmpty && <EventsList events={events} />}
        </Card>
      </div>
      <div className={styles["section-two"]}>
        <Card title="Events Map" footer="Location: Chile">
          {isEventsEmpty && (
            <Map
              events={[]}
              zoom={2.5}
              lat={-36.33325814457118}
              lng={-71.39361021304366}
            />
          )}
          {!isEventsEmpty && (
            <Map
              events={events}
              zoom={2.5}
              lat={-36.33325814457118}
              lng={-71.39361021304366}
            />
          )}
        </Card>
      </div>
    </Fragment>
  );
}

export default Events;

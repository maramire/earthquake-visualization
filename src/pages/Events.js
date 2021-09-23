import { Fragment } from "react";
import styles from "./Events.module.css";
import Card from "../components/Card";
import Map from "../components/Map";
import EventsList from "../components/EventsList";
import { events } from "./dummyData";

function Events() {
  const isEventsEmpty = events.length <= 0;

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

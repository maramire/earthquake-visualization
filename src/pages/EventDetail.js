import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import styles from "./EventDetail.module.css";
import Card from "../components/Card";
import Map from "../components/Map";
import useEventsAPI from "../hooks/useEventsAPI";

function EventDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { getEvent } = useEventsAPI()
  const isEventEmpty = !event?.properties

  useEffect(async () => {
    setIsLoading(true)
    const params = {
      format: "geojson",
      eventid: eventId
    }
    const data = await getEvent(params)      
    setEvent(data);
    setIsLoading(false)        
  }, [eventId]);

  return (
    <Fragment>
      {!isLoading && !isEventEmpty && (
        <Fragment>
          <div className={styles["section-one"]}>
            <Card title="Event Detail">
              <ul className={styles["event-description"]}>
                <li>
                  Magnitude:{" "}
                  <span
                    className={styles.value}
                  >{`${event.properties.mag} ${event.properties.magType}`}</span>
                </li>
                <li>
                  Depth:{" "}
                  <span
                    className={styles.value}
                  >{`${event.geometry.coordinates[2]} km`}</span>
                </li>
                <li>
                  Significance:{" "}
                  <span className={styles.value}>
                    {event.properties.sig}
                    <span className={styles.significance}>/1000</span>
                  </span>
                </li>
              </ul>
            </Card>
          </div>
          <div className={styles["section-two"]}>
            <Card title="Event Map">
              <Map
                events={{ features: [event] }}
                zoom={6.5}
                lat={event.geometry.coordinates[1]}
                lng={event.geometry.coordinates[0]}
              />
            </Card>
          </div>
        </Fragment>
      )}
      {isLoading && (
        <div className={styles["section-one"]}>
          <h1>Loading data...</h1>
        </div>
      )}
    </Fragment>
  );
}

export default EventDetail;

import { useParams } from "react-router-dom";
import { events } from "./dummyData";
import { Fragment } from "react";
import styles from "./EventDetail.module.css";
import Card from "../components/Card";
import Map from "../components/Map";

function EventDetail() {
  // const params = useParams();
  const event = events[0];
  const eventDate = new Date(event.properties.time).toLocaleString();

  return (
    <Fragment>
      <div className={styles.main}>
        <h1>Detalle de evento: {event.properties.title}</h1>
        <p>Fecha de evento: {eventDate}</p>
      </div>
      <div className={styles["section-one"]}>
        <Card title="Detalle de evento">
          <ul className={styles["event-description"]}>
            <li>
              Magnitud: {`${event.properties.mag} ${event.properties.magType}`}
            </li>
            <li>Profundidad: {`${event.geometry.coordinates[2]} km`}</li>
            <li>
              Significancia: {event.properties.sig}
              <span className={styles.significance}>/1000</span>
            </li>
          </ul>
        </Card>
      </div>
      <div className={styles["section-two"]}>
        <Card title="Mapa de evento">
          <Map
            events={[event]}
            zoom={6}
            lat={event.geometry.coordinates[1]}
            lng={event.geometry.coordinates[0]}
          />
        </Card>
      </div>
    </Fragment>
  );
}

export default EventDetail;

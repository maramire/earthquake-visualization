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
        <h1>Lista de eventos</h1>
        <p>Eventos ocurridos en los últimos días.</p>
      </div>
      <div className={styles["section-one"]}>
        <Card title="Listado de eventos">
          {isEventsEmpty && "No hay eventos para mostrar."}
          {!isEventsEmpty && <EventsList events={events} />}
        </Card>
      </div>
      <div className={styles["section-two"]}>
        <Card title="Mapa de eventos" footer="Ubicación: Chile">
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

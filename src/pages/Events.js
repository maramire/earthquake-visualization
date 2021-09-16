import { Fragment } from "react";
import styles from "./Events.module.css";

function Events() {
  return (
    <Fragment>
      <div className={styles.main}>
        <h1>Lista de eventos</h1>
        <p>En esta vista se muestra una lista de eventos y el mapa.</p>
      </div>
      <div className={styles["section-one"]}>
        <div>Here is a list.</div>
      </div>
      <div className={styles["section-two"]}>
        <div>Here is a map</div>
      </div>
    </Fragment>
  );
}

export default Events;

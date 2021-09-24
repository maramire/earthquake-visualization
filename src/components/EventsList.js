import EventsListItem from "./EventsListItem";
import { Link } from "react-router-dom";
import styles from "./EventsList.module.css";

function EventsList(props) {
  return (
    <ul className={styles.list}>
      {props.events.map((event, index) => (
        <Link key={event.id} className={styles.link} to={`events/${event.id}`}>
          <EventsListItem key={event.id} index={index} eventData={event} />
        </Link>
      ))}
    </ul>
  );
}

export default EventsList;

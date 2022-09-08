import { formatInTimeZone } from "date-fns-tz";
import styles from "./EventsListItem.module.css";

function EventsListItem(props) {
  
  const eventDate = formatInTimeZone(props.eventData.properties.time, 'America/Santiago', 'dd/MM/yyyy HH:mm')

  return (
    <div className={styles.item}>
      <p className={styles.date}>{eventDate}</p>
      <p className={styles.place}>{props.eventData.properties.place}</p>
      <p
        className={styles.magnitude}
      >{`${props.eventData.properties.mag} ${props.eventData.properties.magType}`}</p>
    </div>
  );
}

export default EventsListItem;

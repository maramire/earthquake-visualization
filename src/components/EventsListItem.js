import styles from "./EventsListItem.module.css";
function EventsListItem(props) {
  const eventDate = new Date(props.eventData.properties.time).toLocaleString();

  return (
    <div className={styles.item}>
      <p className={styles.index}>{props.index + 1}</p>
      <p className={styles.date}>{eventDate}</p>
      <p className={styles.place}>{props.eventData.properties.place}</p>
      <p
        className={styles.magnitude}
      >{`${props.eventData.properties.mag} ${props.eventData.properties.magType}`}</p>
    </div>
  );
}

export default EventsListItem;

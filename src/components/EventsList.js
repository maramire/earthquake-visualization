import EventsListItem from "./EventsListItem";

function EventsList(props) {
  return (
    <ul>
      {props.events.map((event, index) => (
        <EventsListItem key={event.id} index={index} eventData={event} />
      ))}
    </ul>
  );
}

export default EventsList;

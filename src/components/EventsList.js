import EventsListItem from "./EventsListItem";
import { Link, List } from "@mui/material";

function EventsList(props) {
  return (
    <>
      <List
        height={400}
        width={360}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {props.events.features?.map((event, index) => (
          <EventsListItem key={event.id} index={index} eventData={event} />
        ))}
      </List>
    </>
  );
}

export default EventsList;

import EventsListItem from "./EventsListItem";
import { Box, List } from "@mui/material";

function EventsList(props) {
  return (
    <>
      <List sx={{ height: '40vh', overflow: 'auto' }}>
        {props.isLoading ? (
          <Box sx={{ width: "100%" }}>Loading Data...</Box>
        ): (
          props.events.features?.map((event, index) => (
            <EventsListItem key={event.id} index={index} eventData={event} />
          ))
        )}
      </List>
    </>
  );
}

export default EventsList;

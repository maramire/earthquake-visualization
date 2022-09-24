import EventsListItem from "./EventsListItem";
import { Box, List } from "@mui/material";

function EventsList(props) {
  return (
    <>
      <List
        sx={{
          height: "55vh",
          overflowY: "auto",
          padding: 0,
          scrollBehaviour: "smooth",
          "&::-webkit-scrollbar": {
            width: "0.3em",
          },
          // shadow
          "&::-webkit-scrollbar-track": {
            borderRadius: "25px",
            boxShadow: "inset 0 0 3px #111D4A",
            webkitBoxShadow: "inset 0 0 3px #111D4A",
          },
          // scroll
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "25px",
            backgroundColor: "#111D4A",
          },
        }}
      >
        {props.isLoading ? (
          <Box sx={{ width: "100%" }}>Loading Data...</Box>
        ) : (
          props.events.features?.map((event, index) => (
            <EventsListItem key={event.id} index={index} eventData={event} />
          ))
        )}
      </List>
    </>
  );
}

export default EventsList;

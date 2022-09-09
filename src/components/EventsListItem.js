import { Box, Card, CardActionArea, ListItem } from "@mui/material";
import { Stack } from "@mui/system";
import { formatInTimeZone } from "date-fns-tz";

function EventsListItem(props) {
  const eventDate = formatInTimeZone(
    props.eventData.properties.time,
    "America/Santiago",
    "dd/MM/yyyy HH:mm"
  );

  const cardStyle = {
    "margin-bottom": "0.5em",
    width: "100%",
    "background-color": "#ffffff6e",
    "&:hover": {
      "background-color": "#ffffffff",
    },
  };

  const commonStyles = {
    "text-align": "center",
    padding: "0.5em",
  };

  return (
    <Card sx={cardStyle} variant="outlined">
      <CardActionArea href={`events/${props.eventData.id}`}>
        <ListItem>
        <Stack sx={{ alignItems: "center", width: "100%"  }} direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>          
          <Box sx={{ ...commonStyles, width: "30%" }}>{eventDate}</Box>
          <Box sx={{ ...commonStyles, width: "50%" }}>
            {props.eventData.properties.place}
          </Box>
          <Box
            sx={{ ...commonStyles, width: "20%" }}
          >{`${props.eventData.properties.mag} ${props.eventData.properties.magType}`}</Box>
        </Stack>
        </ListItem>
      </CardActionArea>
    </Card>
  );
}

export default EventsListItem;

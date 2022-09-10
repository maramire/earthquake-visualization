import { Grid, Card, CardActionArea, ListItem } from "@mui/material";
import { formatInTimeZone } from "date-fns-tz";

function EventsListItem(props) {
  const eventDate = formatInTimeZone(
    props.eventData.properties.time,
    "America/Santiago",
    "dd/MM/yyyy HH:mm"
  );

  const cardStyle = {
    "marginBottom": "0.5em",
    width: "100%",
    "backgroundColor": "#ffffff6e",
  };

  const commonStyles = {
    "textAlign": "center",
    padding: "0.2em",
    "fontSize": "13px"
  };

  return (
    <Card sx={cardStyle} variant="outlined">
      <CardActionArea href={`events/${props.eventData.id}`}>
        <ListItem>
          <Grid
            sx={{ alignItems: "center", width: "100%" }}
            container
            columns={{ xs: 2, sm: 8, md: 12 }}
          >
            <Grid xs={1} sm={4} md={4} sx={{ ...commonStyles, width: "30%" }}>
              {eventDate}
            </Grid>
            <Grid xs={1} sm={4} md={4} sx={{ ...commonStyles, width: "50%" }}>
              {props.eventData.properties.place ?? "No Place Information."}
            </Grid>
            <Grid
              xs={2}
              sm={4}
              md={4}
              sx={{ ...commonStyles, width: "20%" }}
            >{`${props.eventData.properties.mag} ${props.eventData.properties.magType}`}</Grid>
          </Grid>
        </ListItem>
      </CardActionArea>
    </Card>
  );
}

export default EventsListItem;

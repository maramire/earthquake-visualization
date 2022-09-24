import { Grid, Card, CardActionArea, ListItem } from "@mui/material";
import { formatInTimeZone } from "date-fns-tz";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import { Stack } from "@mui/system";
import { useContext } from "react";
import MapContext from "../store/map-context";

function EventsListItem(props) {
  const mapContext = useContext(MapContext);
  const eventDate = formatInTimeZone(
    props.eventData.properties.time,
    "America/Santiago",
    "dd/MM/yyyy HH:mm"
  );

  const cardStyle = {
    marginBottom: "0.5em",
    width: "100%",
    backgroundColor: "#ffffff6e",
  };

  const commonStyles = {
    textAlign: "center",
    padding: "0.2em",
    fontSize: "1em",
  };

  return (
    <Card sx={cardStyle} variant="outlined">
      <CardActionArea
        onClick={mapContext.onSelectEvent.bind(this, {
          latitude: props.eventData.geometry.coordinates[1],
          longitude: props.eventData.geometry.coordinates[0],
        })}
      >
        <ListItem>
          <Grid
            sx={{ alignItems: "center", width: "100%" }}
            container
            columns={{ xs: 3, sm: 12, md: 12 }}
          >
            <Grid xs={1} sm={4} md={4} sx={{ ...commonStyles, width: "30%" }}>
              {eventDate}
            </Grid>
            <Grid xs={1} sm={4} md={4} sx={{ ...commonStyles, width: "50%" }}>
              {props.eventData.properties.place ?? "No Place Information."}
            </Grid>
            <Grid xs={1} sm={4} md={4} sx={{ ...commonStyles, width: "20%" }}>
              <Stack sx={{ alignItems: "center" }}>
                <CrisisAlertIcon fontSize="small" sx={{ color: "#F75C03" }} />
                {`${props.eventData.properties.mag} ${props.eventData.properties.magType}`}
              </Stack>
            </Grid>
          </Grid>
        </ListItem>
      </CardActionArea>
    </Card>
  );
}

export default EventsListItem;

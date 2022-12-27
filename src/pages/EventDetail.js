import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import Card from "../components/Card";
import Map from "../components/Map";
import useEventsAPI from "../hooks/useEventsAPI";
import { formatInTimeZone } from "date-fns-tz";
import { Box, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";

function EventDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { getEvent } = useEventsAPI();
  const isEventEmpty = !event?.properties;

  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoading(true);
      const params = {
        format: "geojson",
        eventid: eventId,
      };
      const data = await getEvent(params);
      setEvent(data);
      setIsLoading(false);
    };
    fetchEvent();
  }, [getEvent, eventId]);

  const boxStyle = {
    padding: "2rem",
    width: "100%",
  };

  return (
    <Fragment>
      {!isLoading && !isEventEmpty && (
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid xs={4} sm={8} md={5}>
            <Box sx={boxStyle}>
              <Card title={
                <Typography variant="h6">Event Detail</Typography>
              }>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2">Date</Typography>
                    <span>
                      {formatInTimeZone(
                        event.properties.time,
                        "America/Santiago",
                        "dd/MM/yyyy HH:mm"
                      )}
                    </span>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2">Place</Typography>
                    <span>{`${event.properties.place}` ?? "No info"}</span>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2">Magnitude</Typography>

                    <span>{`${event.properties.mag} ${event.properties.magType}`}</span>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2">Depth</Typography>
                    <span>{`${event.geometry.coordinates[2]} km`}</span>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2">Significance</Typography>
                    <span>
                      {event.properties.sig}
                      <span>/1000</span>
                    </span>
                  </Box>
                </Stack>
              </Card>
            </Box>
          </Grid>
          <Grid xs={4} sm={4} md={7}>
            <Box sx={boxStyle}>
              <Card title={
                <Typography variant="h6">Event Map</Typography>
              }>
                <Map
                  events={{ features: [event] }}
                  viewport={{
                    zoom: 6.5,
                    latitude: event.geometry.coordinates[1],
                    longitude: event.geometry.coordinates[0],
                  }}
                />
              </Card>
            </Box>
          </Grid>
        </Grid>
      )}

      {isLoading && (
        <div>
          <h1>Loading data...</h1>
        </div>
      )}
    </Fragment>
  );
}

export default EventDetail;

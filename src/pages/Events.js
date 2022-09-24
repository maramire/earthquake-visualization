import { Fragment, useState, useEffect, useContext } from "react";
import Card from "../components/Card";
import Map from "../components/Map";
import EventsList from "../components/EventsList";
import MapContext from "../store/map-context";
import { useHistory } from "react-router-dom";
import useEventsAPI from "../hooks/useEventsAPI";
import { zonedTime } from "../helpers/time";
import { Button, Grid, Typography } from "@mui/material";
import EventsListInfo from "../components/EventsListInfo";
import EventsListPagination from "../components/EventsListPagination";
import { Box } from "@mui/system";

function Events() {
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const mapContext = useContext(MapContext);
  const { getEvents, countEvents } = useEventsAPI();
  const isEventsEmpty = events.features && events.features.length === 0;
  let history = useHistory();

  useEffect(() => {
    if (mapContext.startDate && mapContext.endDate) {
      const fetchCountEvents = async () => {
        setIsLoading(true);
        const params = {
          format: "geojson",
          starttime: zonedTime(
            mapContext.startDate + " 00:00:01"
          ).toISOString(),
          endtime: zonedTime(mapContext.endDate + " 23:59:59").toISOString(),
          minlatitude: mapContext.bounds.minLatitude,
          maxlatitude: mapContext.bounds.maxLatitude,
          minlongitude: mapContext.bounds.minLongitude,
          maxlongitude: mapContext.bounds.maxLongitude,
        };
        const data = await countEvents(params);
        setPages(Math.ceil(data.count / 10));
        setCount(data.count);
        setCurrentPage(1);
      };
      fetchCountEvents();
    }
  }, [countEvents, mapContext.bounds, mapContext.startDate, mapContext.endDate]);

  useEffect(() => {
    if (mapContext.startDate && mapContext.endDate) {
      const fetchGetEvents = async () => {
        setIsLoading(true);
        const params = {
          format: "geojson",
          starttime: zonedTime(
            mapContext.startDate + " 00:00:01"
          ).toISOString(),
          endtime: zonedTime(mapContext.endDate + " 23:59:59").toISOString(),
          minlatitude: mapContext.bounds.minLatitude,
          maxlatitude: mapContext.bounds.maxLatitude,
          minlongitude: mapContext.bounds.minLongitude,
          maxlongitude: mapContext.bounds.maxLongitude,
          orderby: mapContext.filter,
          limit: 10,
          offset: 1 + (+currentPage - 1) * 10,
        };
        const data = await getEvents(params);
        setEvents(data);
        setIsLoading(false);
      };
      fetchGetEvents();
    }
  }, [getEvents, mapContext.bounds, mapContext.startDate, mapContext.endDate, mapContext.filter, currentPage]);

  const showEventDetail = (event) => {
    console.log("show event detail", event);
    history.push(`/events/${event.id}`);
  };

  const changePage = (e, value) => {
    setCurrentPage(value);
  };

  const boxStyle = {
    'padding': '2rem',
    width: '100%' 
  }

  const restoreMap = async () => {
    mapContext.mapRef.current?.flyTo({center: [-71.39361021304366, -36.33325814457118], duration: 3000, zoom: 2.5});
    await new Promise(resolve => setTimeout(resolve, 3000))
    mapContext.updateBounds()
  }

  return (
    <Fragment>
      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid xs={4} sm={8} md={5}>
          <Box sx={boxStyle}>
            <Card
              title={<Typography variant="h6" sx={{ color: '#111D4A' }}>Events List</Typography>}
              footer={
                !isEventsEmpty  ? (
                  <EventsListPagination
                    pages={pages}
                    currentPage={currentPage}
                    changePage={changePage}
                  />
                ) : (
                  ""
                )
              }
            >
              <EventsListInfo totalEvents={count} />
              {!isEventsEmpty && <EventsList isLoading={isLoading} events={events} />}
            </Card>
          </Box>
        </Grid>
        <Grid xs={4} sm={4} md={7}>
          <Box sx={boxStyle}>
            <Card title={<Typography variant="h6">Events Map</Typography>}
                  footer={
                    <Button onClick={restoreMap}>Restore Map</Button>
                  }
            >
              <Map
                events={events}
                onEventClick={showEventDetail}
                viewport={mapContext.viewport}
              />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Events;

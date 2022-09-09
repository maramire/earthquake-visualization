import { Fragment, useState, useEffect, useContext } from "react";
import Card from "../components/Card";
import Map from "../components/Map";
import EventsList from "../components/EventsList";
import MapContext from "../store/map-context";
import { useHistory } from "react-router-dom";
import useEventsAPI from "../hooks/useEventsAPI";
import { zonedTime } from "../helpers/time";
import { Grid, Typography } from "@mui/material";
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
  }, [countEvents, mapContext]);

  useEffect(() => {
    if (mapContext.startDate && mapContext.endDate) {
      const fetchGetEvents = async () => {
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
  }, [getEvents, mapContext, currentPage]);

  const showEventDetail = (event) => {
    console.log("show event detail", event);
    history.push(`/events/${event.id}`);
  };

  const changePage = (e, value) => {
    setCurrentPage(value);
  };

  const boxStyle = {
    'padding': '2rem'
  }

  return (
    <Fragment>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid xs={4} sm={8} md={6}>
          <Box sx={boxStyle}>
            <Card
              title={<Typography variant="h6">Events List</Typography>}
              footer={
                !isEventsEmpty && !isLoading ? (
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
              {isLoading && "Loading Data..."}
              {!isEventsEmpty && !isLoading && <EventsList events={events} />}
            </Card>
          </Box>
        </Grid>
        <Grid xs={4} sm={8} md={6}>
          <Card title="Events Map">
            <Map
              events={events}
              viewport={mapContext.viewport}
              onEventClick={showEventDetail}
            />
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Events;

import { Fragment, useState, useEffect, useContext } from "react";
import styles from "./Events.module.css";
import Card from "../components/Card";
import Map from "../components/Map";
import EventsList from "../components/EventsList";
import useFetch from "../hooks/useFetch";
import MapContext from "../store/map-context";
import { useHistory } from "react-router-dom";

function Events() {
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);

  const mapContext = useContext(MapContext);
  const { isLoading, fetchData } = useFetch();
  const isEventsEmpty = events.features && events.features.length === 0;
  let history = useHistory();

  useEffect(() => {
    if (mapContext.startDate && mapContext.endDate) {
      // construct the url to request
      const url = new URL("https://earthquake.usgs.gov/fdsnws/event/1/count");
      const params = {
        format: "geojson",
        starttime: mapContext.startDate,
        endtime: mapContext.endDate,
        minlatitude: mapContext.bounds.minLatitude,
        maxlatitude: mapContext.bounds.maxLatitude,
        minlongitude: mapContext.bounds.minLongitude,
        maxlongitude: mapContext.bounds.maxLongitude,
      };
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
      
      // sending count request
      console.log("updating...", url);
      fetchData(url).then((data) => {
        setCount(data.count);
        setPages(Math.ceil(data.count/10))
        setCurrentPage(1)
      });
    }
  }, [fetchData, mapContext.bounds, mapContext.startDate, mapContext.endDate, mapContext.filter])

  // send request only the first time the component was rendered
  useEffect(() => {
    
    if (mapContext.startDate && mapContext.endDate) {
      // construct the url to request
      const url = new URL("https://earthquake.usgs.gov/fdsnws/event/1/query");
      const params = {
        format: "geojson",
        starttime: mapContext.startDate,
        endtime: mapContext.endDate,
        minlatitude: mapContext.bounds.minLatitude,
        maxlatitude: mapContext.bounds.maxLatitude,
        minlongitude: mapContext.bounds.minLongitude,
        maxlongitude: mapContext.bounds.maxLongitude,
        offset: 1 + (+currentPage - 1)*10
      };
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
      url.searchParams.append('orderby', mapContext.filter)
      url.searchParams.append('limit', 10)
      
      // sending the request
      console.log("sending request...", url);
      fetchData(url).then((data) => {
        setEvents(data);
      });
    }
  }, [fetchData, mapContext.bounds, mapContext.startDate, mapContext.endDate, mapContext.filter, currentPage]);

  const showEventDetail = (event) => {
    console.log("show event detail", event);
    history.push(`/events/${event.id}`);
  };

  const addCurrentPage = (event) => {
    console.log('asd')
    setCurrentPage(currentPage + 1)
  };

  const subCurrentPage = (event) => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  };

  return (
    <Fragment>
      <div className={styles["section-one"]}>
        <Card title="Events List" 
              footer={
                <div className={styles["pageselector"]} value={currentPage}>
                  {
                    currentPage !== 1 ? <a onClick={subCurrentPage} href="#">&laquo;</a> : ''
                  }
                  <a href="#">{currentPage}</a>
                  {
                    currentPage < pages ? <a onClick={addCurrentPage} href="#">&raquo;</a> : ''
                  }
                </div>
              }>
          <div className={styles["form-control"]}>
            <label> Start date:</label>
            <input
              type="date"
              id="start"
              name="trip-start"
              value={mapContext.startDate}
              onChange={mapContext.updateStartDate}
            />
          </div>
            
          <div className={styles["form-control"]}>
            <label>End date:</label>
            <input
              type="date"
              id="end"
              name="trip-start"
              value={mapContext.endDate}
              onChange={mapContext.updateEndDate}
            />
          </div>

          <div className={styles["form-control"]}>
            <label>Order By:</label>
            <select value={mapContext.filter} onChange={mapContext.updateFilter}>
              <option value="time">Más Recientes</option>
              <option value="time-asc">Más Antiguos</option>
              <option value="magnitude-asc">Magnitud Ascendente</option>
              <option value="magnitude">Magnitud Descendente</option>
            </select>
          </div>
          {isEventsEmpty && !isLoading && "There's no events to show."}
          {isLoading && "Loading Data..."}
          {!isEventsEmpty && !isLoading && <EventsList events={events} />}
        </Card>
      </div>
      <div className={styles["section-two"]}>
        <Card title="Events Map" >
          <Map
            events={events}
            viewport={mapContext.viewport}
            onEventClick={showEventDetail}
          />
        </Card>
      </div>
    </Fragment>
  );
}

export default Events;

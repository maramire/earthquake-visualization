import { Fragment, useState, useEffect, useContext } from "react";
import styles from "./Events.module.css";
import Card from "../components/Card";
import Map from "../components/Map";
import EventsList from "../components/EventsList";
import useFetch from "../hooks/useFetch";
import MapContext from "../store/map-context";
import { useHistory } from "react-router-dom";
import useEventsAPI from "../hooks/useEventsAPI";

function Events() {
  const [events, setEvents] = useState([]);
  const [_, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const mapContext = useContext(MapContext);
  const { getEvents, countEvents } = useEventsAPI()
  const isEventsEmpty = events.features && events.features.length === 0;
  console.log(isEventsEmpty)
  let history = useHistory();

  useEffect(async () => {
    setIsLoading(true)
    const params = {
      format: "geojson",
      starttime: mapContext.startDate,
      endtime: mapContext.endDate,
      minlatitude: mapContext.bounds.minLatitude,
      maxlatitude: mapContext.bounds.maxLatitude,
      minlongitude: mapContext.bounds.minLongitude,
      maxlongitude: mapContext.bounds.maxLongitude,
    };
    const data = await countEvents(params)
    setCount(data.count);
    setPages(Math.ceil(data.count/10))
    setCurrentPage(1)
  }, [countEvents, mapContext])

  useEffect(async () => {
    const params = {
      format: "geojson",
      starttime: mapContext.startDate,
      endtime: mapContext.endDate,
      minlatitude: mapContext.bounds.minLatitude,
      maxlatitude: mapContext.bounds.maxLatitude,
      minlongitude: mapContext.bounds.minLongitude,
      maxlongitude: mapContext.bounds.maxLongitude,
      orderby: mapContext.filter,
      limit: 10,
      offset: 1 + (+currentPage - 1)*10
    };
    const data = await getEvents(params)
    setEvents(data)
    setIsLoading(false)
  }, [getEvents, mapContext, currentPage]);

  const showEventDetail = (event) => {
    console.log("show event detail", event);
    history.push(`/events/${event.id}`);
  };

  const addCurrentPage = (event) => {
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
                  {
                    !isEventsEmpty && !isLoading ? <a href="#">{currentPage}</a> : ''
                  }
                  
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

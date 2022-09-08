import { Fragment, useState, useEffect, useContext } from "react";
import styles from "./Events.module.css";
import Card from "../components/Card";
import Map from "../components/Map";
import EventsList from "../components/EventsList";
import MapContext from "../store/map-context";
import { useHistory } from "react-router-dom";
import useEventsAPI from "../hooks/useEventsAPI";
import { zonedTime } from "../helpers/time";

function Events() {
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const mapContext = useContext(MapContext);
  const { getEvents, countEvents } = useEventsAPI()
  const isEventsEmpty = events.features && events.features.length === 0;
  let history = useHistory();

  useEffect(() => {
    if (mapContext.startDate && mapContext.endDate){
      const fetchCountEvents = async () => {
        setIsLoading(true)
        const params = {
          format: "geojson",
          starttime: zonedTime(mapContext.startDate + ' 00:00:01').toISOString(),
          endtime: zonedTime(mapContext.endDate + ' 23:59:59').toISOString(),
          minlatitude: mapContext.bounds.minLatitude,
          maxlatitude: mapContext.bounds.maxLatitude,
          minlongitude: mapContext.bounds.minLongitude,
          maxlongitude: mapContext.bounds.maxLongitude,
        };
        const data = await countEvents(params)
        setPages(Math.ceil(data.count/10))
        setCount(data.count)
        setCurrentPage(1)
      }
      fetchCountEvents()    
    }
  }, [countEvents, mapContext])

  useEffect(() => {
    if (mapContext.startDate && mapContext.endDate){
      const fetchGetEvents = async () => {
        const params = {
          format: "geojson",
          starttime: zonedTime(mapContext.startDate + ' 00:00:01').toISOString(),
          endtime: zonedTime(mapContext.endDate + ' 23:59:59').toISOString(),
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
      }
      fetchGetEvents()
    }
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
                    currentPage !== 1 ? <button onClick={subCurrentPage}>&laquo;</button> : ''
                  }
                  {
                    !isEventsEmpty && !isLoading ? <button>{currentPage}</button> : ''
                  }
                  
                  {
                    currentPage < pages ? <button onClick={addCurrentPage}>&raquo;</button> : ''
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
          <div>
            # of Events: {count}
          </div>
          {isLoading && "Loading Data..."}
          {!isEventsEmpty && !isLoading && (
            <EventsList events={events}/>
          )}
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

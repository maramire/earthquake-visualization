import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import Card from "../components/Card";
import Map from "../components/Map";
import useEventsAPI from "../hooks/useEventsAPI"; 
import { formatInTimeZone } from "date-fns-tz";

function EventDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { getEvent } = useEventsAPI()
  const isEventEmpty = !event?.properties

  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoading(true)
      const params = {
        format: "geojson",
        eventid: eventId
      }
      const data = await getEvent(params)      
      setEvent(data);
      setIsLoading(false)    
    }
    fetchEvent()
  }, [getEvent, eventId]);

  return (
    <Fragment>
      {!isLoading && !isEventEmpty && (
        <Fragment>
          <div >
            <Card title="Event Detail">
              <ul >
                <li>
                  Date:{" "}
                  <span
                    
                  >{formatInTimeZone(event.properties.time, 'America/Santiago', 'dd/MM/yyyy HH:mm')}</span>
                </li>
                <li>
                  Place:{" "}
                  <span
                    
                  >{`${event.properties.place}`}</span>
                </li>
                <li>
                  Magnitude:{" "}
                  <span
                    
                  >{`${event.properties.mag} ${event.properties.magType}`}</span>
                </li>
                <li>
                  Depth:{" "}
                  <span
                    
                  >{`${event.geometry.coordinates[2]} km`}</span>
                </li>
                <li>
                  Significance:{" "}
                  <span >
                    {event.properties.sig}
                    <span >/1000</span>
                  </span>
                </li>
              </ul>
            </Card>
          </div>
          <div >
            <Card title="Event Map">
              <Map
                events={{ features: [event] }}
                zoom={6.5}
                lat={event.geometry.coordinates[1]}
                lng={event.geometry.coordinates[0]}
              />
            </Card>
          </div>
        </Fragment>
      )}
      {isLoading && (
        <div >
          <h1>Loading data...</h1>
        </div>
      )}
    </Fragment>
  );
}

export default EventDetail;

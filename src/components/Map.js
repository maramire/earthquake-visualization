import ReactMapGL from "react-map-gl";
import { useState, useMemo } from "react";
import styles from "./Map.module.css";
import MapMarker from "./MapMarker";

function Map(props) {
  // set map viewport
  const [viewport, setViewport] = useState({
    latitude: props.lat,
    longitude: props.lng,
    zoom: props.zoom,
  });

  // callback passed to MapMarker when marker is clicked
  const showEventDetail = (event) => {
    console.log("show event detail", event);
  };

  // Only rerender markers if events has changed
  const markers = useMemo(
    () =>
      props.events.map((city, index) => (
        <MapMarker
          key={`marker-${index}`}
          data={props.events}
          onClick={showEventDetail}
        />
      )),
    [props.events]
  );

  return (
    <div className={styles.map}>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={(viewport) => setViewport(viewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        {markers}
      </ReactMapGL>
    </div>
  );
}

export default Map;

import ReactMapGL from "react-map-gl";
import { useState, useMemo } from "react";
import mapStyles from "./Map.module.css";
import MapMarker from "./MapMarker";

function Map(props) {
  // set map viewport
  const [viewport, setViewport] = useState({
    latitude: -36.33325814457118,
    longitude: -71.39361021304366,
    zoom: 2.5,
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
    <div className={mapStyles.map}>
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

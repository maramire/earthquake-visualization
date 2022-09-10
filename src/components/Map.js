import ReactMapGL from "react-map-gl";
import { useMemo, useRef, useContext } from "react";
import MapMarker from "./MapMarker";
import MapContext from "../store/map-context";
import { Box } from "@mui/material";

function Map(props) {
  const mapRef = useRef();
  const mapContext = useContext(MapContext);
  // callback passed to MapMarker when marker is clicked

  // Only rerender markers if events has changed
  const markers = useMemo(
    () =>
      props.events.features?.map((city, index) => (
        <MapMarker
          key={`marker-${index}`}
          data={props.events.features}
          onClick={props.onEventClick}
        />
      )),
    [props.events.features, props.onEventClick]
  );

  const touchEndHandler = (e,s) => {
    const bounds = mapRef.current.getMap().getBounds();
    const coords = {
      minLatitude: bounds._sw.lat.toString(),
      maxLatitude: bounds._ne.lat.toString(),
      minLongitude: bounds._sw.lng.toString(),
      maxLongitude: bounds._ne.lng.toString(),
    };
    mapContext.setBounds(coords);
  };
  return (
    <Box >
      <ReactMapGL
        initialViewState={{
          latitude: -36.33325814457118,
          longitude: -71.39361021304366,
          zoom: 2.5,
        }}
        ref={mapRef}
        onMouseUp={touchEndHandler}
        onWheel={touchEndHandler}
        style={{width: 600, height: 500}}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {markers}
      </ReactMapGL>
    </Box>
  );
}

export default Map;

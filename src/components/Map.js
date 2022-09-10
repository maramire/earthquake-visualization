import ReactMapGL from "react-map-gl";
import { useMemo, useRef, useContext } from "react";
import MapMarker from "./MapMarker";
import MapContext from "../store/map-context";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';

function Map(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between('xs','md'));

  const mapStyle = { height: "70vh", width: "50vw" }
  const mobileMapStyle = { height: "70vh", width: "80vw" }

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
    <Box>
      <ReactMapGL
        initialViewState={{
          latitude: -36.33325814457118,
          longitude: -71.39361021304366,
          zoom: 2.5,
        }}
        ref={mapRef}
        onWheel={touchEndHandler}
        onDragEnd={touchEndHandler}
        style={isMobile ? mobileMapStyle : mapStyle}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {markers}
      </ReactMapGL>
    </Box>
  );
}

export default Map;

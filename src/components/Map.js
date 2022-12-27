import ReactMapGL from "react-map-gl";
import { useMemo, useContext } from "react";
import MapMarker from "./MapMarker";
import MapContext from "../store/map-context";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';

function Map(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'));

  const mapStyle = { height: "70vh", width: "50vw", borderRadius: "10px" }
  const mobileMapStyle = { height: "70vh", width: "80vw", borderRadius: "10px" }

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


  return (
    <Box>
      <ReactMapGL
        initialViewState={props.viewport}
        ref={mapContext.mapRef}
        onWheel={mapContext.updateBounds}
        onDragEnd={mapContext.updateBounds}
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

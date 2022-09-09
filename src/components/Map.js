import ReactMapGL from "react-map-gl";
import { useMemo, useRef, useContext } from "react";
import MapMarker from "./MapMarker";
import MapContext from "../store/map-context";

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

  const viewportChangeHandler = (viewport, interactionState) => {
    mapContext.setViewport(viewport);
  };

  const touchEndHandler = (e) => {
    const bounds = mapRef.current.getMap().getBounds();
    console.log(bounds);
    const coords = {
      minLatitude: bounds._sw.lat.toString(),
      maxLatitude: bounds._ne.lat.toString(),
      minLongitude: bounds._sw.lng.toString(),
      maxLongitude: bounds._ne.lng.toString(),
    };
    mapContext.setBounds(coords);
  };
  return (
    <div >
      <ReactMapGL
        {...mapContext.viewport}
        ref={mapRef}
        onMouseUp={touchEndHandler}
        onWheel={touchEndHandler}
        width="100%"
        height="100%"
        onViewportChange={viewportChangeHandler}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        {markers}
      </ReactMapGL>
    </div>
  );
}

export default Map;

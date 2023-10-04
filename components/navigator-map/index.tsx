import * as React from "react";

import Map from "react-map-gl";

import GeocoderControl from "./geocoder-control";
import { config } from "@/lib/config";

export function NavigatorMap() {
  return (
    <div id="map" className="relative">
      <Map
        // className="relative"
        initialViewState={{
          longitude: -79.4512,
          latitude: 43.6568,
          zoom: 13,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={config.mapboxApiKey}
      >
        <GeocoderControl
          mapboxAccessToken={config.mapboxApiKey}
          position="top-left"
        />
      </Map>
      {/* <ControlPanel /> */}
    </div>
  );
}

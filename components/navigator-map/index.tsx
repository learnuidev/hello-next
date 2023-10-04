import * as React from "react";

import Map from "react-map-gl";

import GeocoderControl from "./geocoder-control";
import { config } from "@/lib/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCatSpace } from "@fortawesome/sharp-solid-svg-icons/faCatSpace";

export function NavigatorMap() {
  if (config.mapboxApiKey) {
    return (
      <div className="flex items-center justify-center flex-col my-32">
        <FontAwesomeIcon className="text-8xl text-gray-200" icon={faCatSpace} />
        <h1 className="text-center text-gray-300 my-4">
          Map Box API Key Not Provided
        </h1>
      </div>
    );
  }
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

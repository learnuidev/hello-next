import * as React from "react";

import Map, { Marker } from "react-map-gl";

import GeocoderControl from "./geocoder-control";
import { config } from "@/lib/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCatSpace } from "@fortawesome/sharp-solid-svg-icons/faCatSpace";
import { faMap, faMapLocationDot } from "@fortawesome/sharp-solid-svg-icons";

export function NavigatorMap() {
  if (!config.mapboxApiKey) {
    return (
      <div className="flex items-center justify-center flex-col my-32">
        <FontAwesomeIcon className="text-8xl text-gray-200" icon={faCatSpace} />
        <h1 className="text-center text-gray-300 my-4">
          Map Box API Key Not Provided
        </h1>
      </div>
    );
  }

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-77.032, 38.913],
        },
        properties: {
          title: "Mapbox",
          description: "Washington, D.C.",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-122.414, 37.776],
        },
        properties: {
          title: "Mapbox",
          description: "San Francisco, California",
        },
      },
    ],
  };

  return (
    <div id="map" className="h-[700px]">
      <Map
        // className="relative"
        initialViewState={{
          latitude: 38.913,
          longitude: -77.032,
          zoom: 12,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={config.mapboxApiKey}
      >
        <GeocoderControl
          mapboxAccessToken={config.mapboxApiKey}
          position="top-right"
        />

        <Marker longitude={-77.032} latitude={38.913}>
          <FontAwesomeIcon className="marker text-2xl" icon={faMap} />
        </Marker>
      </Map>
      {/* <ControlPanel /> */}
    </div>
  );
}

/** @format */

import React, { useMemo, useState, useEffect } from "react";
import "./map.css";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

export default function Map() {
  const google_api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: google_api_key,
  });

  const address = "16 Edgeware Dr, Etobicoke, Toronto, ON, Canada";

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${google_api_key}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setLatitude(+location.lat);
          setLongitude(+location.lng);
        } else {
          console.log("No address found.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCoordinates();
  }, [google_api_key, address]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return <GgMap longitude={longitude} latitude={latitude} />;
}

function GgMap({ latitude, longitude }) {
  const center = useMemo(
    () => ({ lat: latitude, lng: longitude }),
    [latitude, longitude]
  );
  return (
    <div className="map_container">
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map grid wide"
      >
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  );
}

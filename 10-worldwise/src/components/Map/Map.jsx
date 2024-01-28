import { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useCity } from "../../contexts/CityContext";
import Button from "../Button";
import { useGeolocation } from "../../hooks/useGeolocation";

const position = [40, 0];
function Map() {
  const { cities } = useCity();

  const [searchParams] = useSearchParams();
  const [mapPosition, setMapPostion] = useState(position);
  const {
    isLoading: isLoadingGeoLocation,
    position: geoLocationPostion,
    getPosition,
  } = useGeolocation({ defaultPosition: null });
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  // console.log("gePos:", geoLocationPostion);

  useEffect(
    function () {
      if (lat && lng) {
        setMapPostion([lat, lng]);
      }
    },
    [lat, lng]
  );

  console.log("gePos:", geoLocationPostion);

  useEffect(
    function () {
      if (geoLocationPostion) {
        setMapPostion([geoLocationPostion.lat, geoLocationPostion.lng]);
      }
      console.log("gePos:", geoLocationPostion);
    },
    [geoLocationPostion]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPostion && (
        <Button type={"position"} onClick={getPosition}>
          {isLoadingGeoLocation ? "Loading...." : "Use your Location"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]} //[city.position.lat, city.position.lng]
            key={city.id}
          >
            <Popup>
              <span>
                {city.emoji} {city.cityName}
              </span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;

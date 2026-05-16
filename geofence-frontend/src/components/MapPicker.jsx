import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useState } from "react";

// FIX MARKER ICON
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationMarker({ position, setPosition }) {

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position ? (
    <Marker position={position}></Marker>
  ) : null;
}

export default function MapPicker({
  position,
  setPosition,
}) {

  const [search, setSearch] = useState("");

  // 🔥 CURRENT LOCATION
  const useCurrentLocation = () => {

    navigator.geolocation.getCurrentPosition(
      (pos) => {

        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });

      },
      () => {
        alert("Location access denied ❌");
      }
    );
  };

  // 🔥 SEARCH LOCATION
  const handleSearch = async () => {

    if (!search) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${search}`
    );

    const data = await res.json();

    if (data.length > 0) {

      setPosition({
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      });

    } else {
      alert("Location not found ❌");
    }
  };

  return (
    <div style={styles.container}>

      <h3 style={styles.heading}>
        Select Event Location 📍
      </h3>

      {/* SEARCH */}
      <div style={styles.searchBox}>

        <input
          placeholder="Search city, area, venue..."
          value={search}
          style={styles.input}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <button
          style={styles.searchBtn}
          onClick={handleSearch}
        >
          Search
        </button>

        <button
          style={styles.locationBtn}
          onClick={useCurrentLocation}
        >
          Use Current Location
        </button>

      </div>

      {/* MAP */}
      <MapContainer
        center={
          position || {
            lat: 21.1458,
            lng: 79.0882,
          }
        }
        zoom={13}
        style={styles.map}
      >

        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker
          position={position}
          setPosition={setPosition}
        />

      </MapContainer>

      {/* COORDINATES */}
      {position && (
        <div style={styles.coords}>
          <p>
            🌍 Latitude: {position.lat}
          </p>

          <p>
            🌍 Longitude: {position.lng}
          </p>
        </div>
      )}

    </div>
  );
}

const styles = {

  container: {
    marginTop: "20px",
    marginBottom: "30px",
  },

  heading: {
    marginBottom: "15px",
    fontSize: "22px",
  },

  searchBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
    flexWrap: "wrap",
  },

  input: {
    flex: 1,
    minWidth: "220px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
  },

  searchBtn: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "10px",
    background: "#3b82f6",
    color: "#fff",
    cursor: "pointer",
  },

  locationBtn: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "10px",
    background: "#22c55e",
    color: "#fff",
    cursor: "pointer",
  },

  map: {
    height: "450px",
    width: "100%",
    borderRadius: "18px",
    overflow: "hidden",
  },

  coords: {
    marginTop: "15px",
    background: "rgba(255,255,255,0.08)",
    padding: "15px",
    borderRadius: "12px",
  },
};
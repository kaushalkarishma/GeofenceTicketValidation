import { useEffect, useState } from "react";
import API from "../../api/API";

export default function MyBookings() {

  const [bookings, setBookings] = useState([]);

  // 🔥 FETCH BOOKINGS
  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings = async () => {

    try {

      const res = await API.get(
        "/bookings/user"
      );

      console.log(res.data);

      setBookings(
        Array.isArray(res.data)
          ? res.data
          : []
      );

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.error ||
        "Failed to fetch bookings "
      );
    }
  };

  // 🔥 CANCEL BOOKING
  const handleCancel = async (id) => {

    try {

      await API.delete(
        `/bookings/cancel/${id}`
      );

      alert(
        "Booking cancelled "
      );

      fetchBookings();

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.error ||
        "Cancel failed "
      );
    }
  };

  // 🔥 VALIDATE TICKET
  const handleValidate = (booking) => {

    if (!booking.event) {

      alert("Event data missing ");

      return;
    }

    navigator.geolocation.getCurrentPosition(

      async (pos) => {

        try {

          const userLat =
            pos.coords.latitude;

          const userLng =
            pos.coords.longitude;
         console.log(booking.event);
          const eventLng =
  booking.event.location.coordinates[0];

const eventLat =
  booking.event.location.coordinates[1];

          const radius =
            booking.event.radius;

          // 🔥 DISTANCE FORMULA
          const distance =
            getDistanceFromLatLonInMeters(
              userLat,
              userLng,
              eventLat,
              eventLng
            );
            console.log("Distance:", distance);

console.log("Radius:", radius);

console.log(
  "User Location:",
  userLat,
  userLng
);

console.log(
  "Event Location:",
  eventLat,
  eventLng
);

          if (distance <= radius) {

            await API.put(
              "/bookings/validate",
              {
                bookingId: booking.id,

                eventId:
                  booking.event.id,

                latitude: userLat,

                longitude: userLng,
              }
            );

            alert(
              "Ticket Validated Successfully"
            );

            fetchBookings();

          } else {

            alert(
              " User is outside the geofence"
            );
          }

        } catch (err) {

          console.log(err);

          alert(
            err.response?.data?.error ||
            "Validation failed "
          );
        }
      },

      () => {

        alert(
          "Location permission denied "
        );
      }
    );
  };

  // 🔥 DISTANCE CALCULATOR
  function getDistanceFromLatLonInMeters(
    lat1,
    lon1,
    lat2,
    lon2
  ) {

    const R = 6371000;

    const dLat =
      ((lat2 - lat1) * Math.PI) / 180;

    const dLon =
      ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
      2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return R * c;
  }

  return (

    <div style={styles.container}>

      <div style={styles.wrapper}>

        <h1 style={styles.heading}>
          My Bookings
        </h1>

        <div style={styles.list}>

          {bookings.length > 0 ? (

            bookings
  .filter(
    (b) => b.event
  )
  .map((b) => (

              <div
                key={b.id}
                style={styles.card}
              >

                {/* LEFT */}
                <div>

                  <h2 style={styles.eventName}>
                    {b.event?.name}
                  </h2>

                  <p style={styles.text}>
                    📅{" "}
                    {b.event?.date
                      ? new Date(
                          b.event.date
                        ).toDateString()
                      : "No Date"}
                  </p>

                  <p style={styles.text}>
                    💰 ₹{b.event?.price}
                  </p>
                  <p style={styles.text}>
  ⏰ {b.event?.startTime} - {b.event?.endTime}
</p>

<p style={styles.text}>
  📍 {b.event?.area}
</p>

                </div>

                {/* RIGHT */}
                <div style={styles.right}>

                  <span
                    style={{
                      ...styles.status,

                      background:
                        b.status ===
                        "validated"
                          ? "#22c55e"
                          : "#3b82f6",
                    }}
                  >
                    {b.status}
                  </span>

                  {/* VALIDATE */}
                  {b.status !==
                    "validated" && (

                    <button
                      style={
                        styles.validateBtn
                      }

                      onClick={() =>
                        handleValidate(b)
                      }
                    >
                      Validate
                    </button>
                  )}

                  {/* CANCEL */}
                  {b.status !== "validated" && (

  <button
    style={styles.cancelBtn}

    onClick={() =>
      handleCancel(b.id)
    }
  >
    Cancel
  </button>
)}

                </div>

              </div>
            ))

          ) : (

            <h2 style={styles.empty}>
              No bookings found 
            </h2>
          )}

        </div>

      </div>

    </div>
  );
}

const styles = {

  container: {
    paddingTop: "100px",

    minHeight: "100vh",

    display: "flex",

    justifyContent: "center",

    background:
      "radial-gradient(circle at top left, #1e293b, #020617)",

    color: "#fff",
  },

  wrapper: {
    width: "100%",

    maxWidth: "1100px",

    padding: "20px",
  },

  heading: {
    fontSize: "42px",

    marginBottom: "35px",

    fontWeight: "bold",
  },

  list: {
    display: "flex",

    flexDirection: "column",

    gap: "25px",
  },

  card: {
    padding: "30px",

    borderRadius: "18px",

    background:
      "rgba(255,255,255,0.08)",

    backdropFilter: "blur(15px)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.4)",

    transition: "0.3s",
  },

  eventName: {
    marginBottom: "10px",

    fontSize: "28px",
  },

  text: {
    color: "#cbd5e1",

    fontSize: "16px",

    marginBottom: "8px",
  },

  right: {
    display: "flex",

    alignItems: "center",

    gap: "15px",

    flexWrap: "wrap",
  },

  status: {
    padding: "10px 18px",

    borderRadius: "10px",

    color: "#fff",

    fontWeight: "bold",

    textTransform: "capitalize",

    fontSize: "14px",
  },

  validateBtn: {
    padding: "10px 18px",

    borderRadius: "10px",

    border: "none",

    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",

    color: "#fff",

    cursor: "pointer",

    fontWeight: "bold",
  },

  cancelBtn: {
    padding: "10px 16px",

    borderRadius: "10px",

    border: "none",

    background: "#ef4444",

    color: "#fff",

    cursor: "pointer",

    fontWeight: "bold",

    transition: "0.3s",
  },

  empty: {
    textAlign: "center",

    marginTop: "50px",

    color: "#cbd5e1",
  },
};
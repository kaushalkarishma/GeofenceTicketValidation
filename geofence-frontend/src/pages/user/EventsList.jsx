import { useEffect, useState } from "react";
import API from "../../api/API";

export default function EventsList() {

  const [events, setEvents] = useState([]);

  // 🔥 FETCH EVENTS
  useEffect(() => {

    fetchEvents();

  }, []);

  const fetchEvents = async () => {

    try {

      const res = await API.get("/events/all");

      console.log(res.data);

      setEvents(res.data);

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.error ||
        "Failed to fetch events "
      );
    }
  };

  // 🔥 BOOK EVENT
  const handleBooking = async (eventId) => {

     try {

    await API.post(
      "/bookings/book",
      {
        eventId,
      }
    );

    alert(
      "Ticket booked successfully "
    );

  } catch (err) {

    console.log(err);

    alert(
      err.response?.data?.error ||
      "Booking failed "
    );
  }
};

  return (
    <div style={styles.container}>

      <h1 style={styles.heading}>
        Available Events
      </h1>

      <div style={styles.grid}>

        {events.length > 0 ? (

          events.map((event) => (

            <div
              key={event._id}
              style={styles.card}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform =
                  "translateY(-12px) scale(1.03)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform =
                  "translateY(0px) scale(1)")
              }
            >

              <h2 style={styles.title}>
                {event.name}
              </h2>

              <p style={styles.text}>
  📅 {new Date(event.date).toDateString()}
</p>

<p style={styles.text}>
  ⏰ {event.startTime} - {event.endTime}
</p>

<p style={styles.text}>
  📍 {event.area}
</p>

<p style={styles.text}>
  💰 ₹{event.price}
</p>

<p style={styles.text}>
  🎟️ Seats: {event.seats}
</p>

<p style={styles.text}>
  📌 Radius: {event.radius}m
</p>

              <button
                style={styles.button}
                onClick={() =>
                  handleBooking(event.id)
                }
                onMouseOver={(e) =>
                  (e.target.style.transform =
                    "scale(1.08)")
                }
                onMouseOut={(e) =>
                  (e.target.style.transform =
                    "scale(1)")
                }
              >
                Book Now
              </button>

            </div>
          ))

        ) : (

          <p style={styles.noEvents}>
            No events available 
          </p>
        )}

      </div>

    </div>
  );
}

const styles = {

  container: {
    paddingTop: "100px",
    minHeight: "100vh",
    paddingInline: "40px",

    background:
      "radial-gradient(circle at top left, #1e293b, #020617)",

    color: "#fff",
  },

  heading: {
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "32px",
    fontWeight: "bold",
  },

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit, minmax(300px, 1fr))",

    gap: "30px",
  },

  card: {
    background: "rgba(255,255,255,0.08)",

    backdropFilter: "blur(15px)",

    padding: "25px",

    borderRadius: "18px",

    border:
      "1px solid rgba(255,255,255,0.1)",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.6)",

    transition: "all 0.3s ease",

    cursor: "pointer",
  },

  title: {
    marginBottom: "12px",
    fontSize: "22px",
  },

  text: {
    color: "#ccc",
    marginBottom: "10px",
    fontSize: "14px",
  },

  button: {
    marginTop: "18px",

    width: "100%",

    padding: "12px",

    borderRadius: "12px",

    border: "none",

    background:
      "linear-gradient(135deg, #3b82f6, #6366f1)",

    color: "#fff",

    cursor: "pointer",

    fontWeight: "bold",

    fontSize: "15px",

    transition: "0.3s",
  },

  noEvents: {
    textAlign: "center",
    fontSize: "18px",
    color: "#cbd5e1",
    marginTop: "50px",
  },
};
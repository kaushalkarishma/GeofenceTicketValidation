import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/API";

export default function UserDashboard() {

  const navigate = useNavigate();

  // 🔥 STATES
  const [bookings, setBookings] =
    useState([]);

  const [events, setEvents] =
    useState([]);

  // 🔥 FETCH DATA
  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData =
    async () => {

      try {

        // 🔥 BOOKINGS
        const bookingRes =
          await API.get(
            "/bookings/user"
          );

        // 🔥 EVENTS
        const eventRes =
          await API.get(
            "/events/all"
          );

        setBookings(
          Array.isArray(
            bookingRes.data
          )
            ? bookingRes.data
            : []
        );

        setEvents(
          Array.isArray(
            eventRes.data
          )
            ? eventRes.data
            : []
        );

      } catch (err) {

        console.log(err);

        alert(
          "Failed to load dashboard "
        );
      }
    };

  return (

    <div style={styles.container}>

      <div style={styles.wrapper}>

        {/* 🔥 HEADING */}
        <h1 style={styles.heading}>
          Welcome Back 
        </h1>

        <p style={styles.subheading}>
          Track your bookings and
          explore events
        </p>

        {/* 🔥 STATS */}
        <div style={styles.statsGrid}>

          {/* TOTAL BOOKINGS */}
          <div style={styles.card}>

            <h2 style={styles.cardNumber}>
              {bookings.length}
            </h2>

            <p style={styles.cardText}>
              Total Bookings
            </p>

          </div>

          {/* TOTAL EVENTS */}
          <div style={styles.card}>

            <h2 style={styles.cardNumber}>
              {events.length}
            </h2>

            <p style={styles.cardText}>
              Available Events
            </p>

          </div>

          {/* VALIDATED */}
          <div style={styles.card}>

            <h2 style={styles.cardNumber}>
              {
                bookings.filter(
                  (b) =>
                    b.status ===
                    "validated"
                ).length
              }
            </h2>

            <p style={styles.cardText}>
              Validated Tickets
            </p>

          </div>

        </div>

        {/* 🔥 ACTION BUTTONS */}
        <div style={styles.actions}>

          <button
            style={styles.primaryBtn}

            onClick={() =>
              navigate("/events")
            }
          >
            Explore Events
          </button>

          <button
            style={styles.secondaryBtn}

            onClick={() =>
              navigate("/my-bookings")
            }
          >
            My Bookings
          </button>

        </div>


        {/* 🔥 RECENT BOOKINGS */}
        <h2 style={styles.sectionTitle}>
          Recent Bookings
        </h2>

        <div style={styles.bookingList}>

          {bookings.length > 0 ? (

            bookings
             .filter(
    (booking) =>
      booking.event &&
      booking.event.date
  )
              .slice(0, 5)
              .map((booking) => (

                <div
                  key={booking.id}

                  style={
                    styles.bookingCard
                  }
                >

                  {/* LEFT */}
                  <div>

                    <h3>
                      {
                        booking.event
                          ?.name
                      }
                    </h3>

                    <p
                      style={
                        styles.smallText
                      }
                    >
                      {booking.event
                        ?.date
                        ? new Date(
                            booking
                              .event
                              .date
                          ).toDateString()
                        : "No Date"}
                    </p>

                  </div>

                  {/* RIGHT */}
                  <span
                    style={{
                      ...styles.status,

                      background:
                        booking.status ===
                        "validated"
                          ? "#22c55e"
                          : "#3b82f6",
                    }}
                  >
                    {booking.status}
                  </span>

                </div>
              ))

          ) : (

            <div style={styles.emptyCard}>

              <h3>
                No bookings yet 
              </h3>

              <p
                style={
                  styles.smallText
                }
              >
                Start booking events
                now
              </p>

            </div>
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
    fontSize: "38px",

    marginBottom: "10px",

    fontWeight: "bold",
  },

  subheading: {
    color: "#aaa",

    marginBottom: "35px",

    fontSize: "16px",
  },

  statsGrid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",

    gap: "20px",

    marginBottom: "35px",
  },

  card: {
    padding: "30px",

    borderRadius: "18px",

    background:
      "rgba(255,255,255,0.08)",

    backdropFilter: "blur(15px)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    textAlign: "center",

    transition: "0.3s",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.3)",
  },

  cardNumber: {
    fontSize: "40px",

    marginBottom: "12px",
  },

  cardText: {
    color: "#cbd5e1",

    fontSize: "16px",
  },

  actions: {
    display: "flex",

    gap: "15px",

    marginBottom: "35px",

    flexWrap: "wrap",
  },

  primaryBtn: {
    padding: "14px 24px",

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

  secondaryBtn: {
    padding: "14px 24px",

    borderRadius: "12px",

    border:
      "1px solid rgba(255,255,255,0.2)",

    background:
      "rgba(255,255,255,0.05)",

    color: "#fff",

    cursor: "pointer",

    fontWeight: "bold",

    fontSize: "15px",

    transition: "0.3s",
  },

  sectionTitle: {
    marginBottom: "18px",

    fontSize: "28px",
  },

  bookingList: {
    display: "flex",

    flexDirection: "column",

    gap: "18px",
  },

  bookingCard: {
    padding: "24px",

    borderRadius: "16px",

    background:
      "rgba(255,255,255,0.08)",

    backdropFilter: "blur(15px)",

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    border:
      "1px solid rgba(255,255,255,0.08)",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.3)",
  },

  status: {
    padding: "8px 16px",

    borderRadius: "10px",

    color: "#fff",

    fontSize: "13px",

    fontWeight: "bold",

    textTransform: "capitalize",
  },

  smallText: {
    color: "#aaa",

    fontSize: "13px",

    marginTop: "6px",
  },

  emptyCard: {
    padding: "30px",

    borderRadius: "18px",

    textAlign: "center",

    background:
      "rgba(255,255,255,0.06)",

    border:
      "1px solid rgba(255,255,255,0.08)",
  },
};
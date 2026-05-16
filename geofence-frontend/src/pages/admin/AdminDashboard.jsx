import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import MapPicker from "../../components/MapPicker";
import API from "../../api/API";

export default function AdminDashboard() {

  const [events, setEvents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    price: "",
    seats: "",
    radius: "",
  });

  // 🔥 EDIT STATE
  const [editingId, setEditingId] =
    useState(null);

  // 🔥 MAP LOCATION
  const [position, setPosition] =
    useState(null);

  // 🔥 FETCH EVENTS
  useEffect(() => {

    fetchEvents();

  }, []);

  const fetchEvents = async () => {

    try {

      const res =
        await API.get(
          "/events/all"
        );

      setEvents(
        Array.isArray(res.data)
          ? res.data
          : []
      );

    } catch (err) {

      console.log(err);

      alert(
        "Failed to fetch events "
      );
    }
  };

  // 🔥 CREATE / UPDATE EVENT
  const handleCreate = async () => {

    if (
      !form.name ||
      !form.description ||
      !form.date ||
      !form.startTime ||
      !form.endTime ||
      !form.venue ||
      !form.price ||
      !form.seats ||
      !form.radius
    ) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    if (!position) {

      alert(
        "Please select location on map"
      );

      return;
    }

    try {

      const payload = {

        name: form.name,

        description:
          form.description,

        date: form.date,

        startTime:
          form.startTime,

        endTime:
          form.endTime,

        area: form.venue,

        price: Number(
          form.price
        ),

        seats: Number(
          form.seats
        ),

        radius: Number(
          form.radius
        ),

        location: {

          type: "Point",

          coordinates: [
            position.lng,
            position.lat,
          ],
        },
      };

      // 🔥 UPDATE EVENT
      if (editingId) {

        console.log(
          "UPDATE API CALLED"
        );

        await API.put(
          `/events/update/${editingId}`,
          payload
        );

        alert(
          "Event updated successfully "
        );

        setEditingId(null);

      } else {

        console.log(
          "CREATE API CALLED"
        );

        // 🔥 CREATE EVENT
        await API.post(
          "/events/create",
          payload
        );

        alert(
          "Event created successfully "
        );
      }

      // 🔥 REFRESH EVENTS
      fetchEvents();

      // 🔥 RESET FORM
      setForm({
        name: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        venue: "",
        price: "",
        seats: "",
        radius: "",
      });

      setPosition(null);

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.error ||
        "Operation failed "
      );
    }
  };

  // 🔥 DELETE EVENT
  const handleDelete = async (id) => {

    try {

      await API.delete(
        `/events/delete/${id}`
      );

      alert(
        "Event deleted successfully "
      );

      fetchEvents();

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.error ||
        "Delete failed "
      );
    }
  };

  // 🔥 EDIT EVENT
  const handleEdit = (event) => {

    setEditingId(
      event.id || event._id
    );

    setForm({

      name:
        event.name || "",

      description:
        event.description || "",

      date: event.date
        ? event.date
            .split("T")[0]
        : "",

      startTime:
        event.startTime || "",

      endTime:
        event.endTime || "",

      venue:
        event.area || "",

      price:
        event.price || "",

      seats:
        event.seats || "",

      radius:
        event.radius || "",
    });

    setPosition({

      lat:
        event.location
          ?.coordinates?.[1],

      lng:
        event.location
          ?.coordinates?.[0],
    });

    // 🔥 SCROLL TO TOP
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (

    <div style={styles.container}>

      <div style={styles.wrapper}>

        <h1 style={styles.heading}>
          Admin Panel
        </h1>

        {/* 🔥 FORM */}
        <div style={styles.form}>

          <input
            placeholder="Event Name"

            value={form.name}

            style={styles.input}

            onChange={(e) =>
              setForm({
                ...form,
                name:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Description"

            value={form.description}

            style={styles.input}

            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
          />

          <input
            type="date"

            value={form.date}

            style={{
              ...styles.input,
              colorScheme:
                "dark",
            }}

            onChange={(e) =>
              setForm({
                ...form,
                date:
                  e.target.value,
              })
            }
          />

          <input
            type="time"

            value={form.startTime}

            style={{
              ...styles.input,
              colorScheme:
                "dark",
            }}

            onChange={(e) =>
              setForm({
                ...form,
                startTime:
                  e.target.value,
              })
            }
          />

          <input
            type="time"

            value={form.endTime}

            style={{
              ...styles.input,
              colorScheme:
                "dark",
            }}

            onChange={(e) =>
              setForm({
                ...form,
                endTime:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Venue"

            value={form.venue}

            style={styles.input}

            onChange={(e) =>
              setForm({
                ...form,
                venue:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Ticket Price ₹"

            value={form.price}

            style={styles.input}

            onChange={(e) =>
              setForm({
                ...form,
                price:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Available Seats"

            value={form.seats}

            style={styles.input}

            onChange={(e) =>
              setForm({
                ...form,
                seats:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Radius (meters)"

            value={form.radius}

            style={styles.input}

            onChange={(e) =>
              setForm({
                ...form,
                radius:
                  e.target.value,
              })
            }
          />

          <button
            style={styles.createBtn}

            onClick={handleCreate}
          >
            {editingId
              ? "Update Event "
              : "Create Event "}
          </button>

        </div>

        {/* 🔥 MAP */}
        <MapPicker
          position={position}
          setPosition={
            setPosition
          }
        />

        {/* 🔥 EVENTS LIST */}
        <div style={styles.list}>

          {events.map((e) => (

            <div
              key={
                e.id || e._id
              }

              style={styles.card}
            >

              {/* LEFT */}
              <div>

                <h2 style={styles.title}>
                  {e.name}
                </h2>

                <p
                  style={
                    styles.description
                  }
                >
                  {
                    e.description
                  }
                </p>

                <p style={styles.text}>
                  📅{" "}
                  {e.date
                    ? new Date(
                        e.date
                      ).toDateString()
                    : "No Date"}
                </p>

                <p style={styles.text}>
                  ⏰{" "}
                  {e.startTime} -{" "}
                  {e.endTime}
                </p>

                <p style={styles.text}>
                  📍 {e.area}
                </p>

                <p style={styles.text}>
                  💰 ₹{e.price}
                </p>

                <p style={styles.text}>
                  🎟️ Seats:{" "}
                  {e.seats}
                </p>

                <p style={styles.text}>
                  📌 Radius:{" "}
                  {e.radius}m
                </p>


              </div>

              {/* RIGHT */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems:
                    "center",
                }}
              >

                <button
                  style={
                    styles.editBtn
                  }

                  onClick={() =>
                    handleEdit(e)
                  }
                >
                  Edit
                </button>

                <button
                  style={
                    styles.deleteBtn
                  }

                  onClick={() =>
                    handleDelete(
                      e.id ||
                        e._id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

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

    maxWidth: "1200px",

    padding: "20px",
  },

  heading: {
    fontSize: "42px",

    marginBottom: "30px",
  },

  form: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",

    gap: "15px",

    marginBottom: "30px",
  },

  input: {
    padding: "14px",

    borderRadius: "12px",

    border:
      "1px solid rgba(255,255,255,0.1)",

    background:
      "rgba(255,255,255,0.08)",

    backdropFilter:
      "blur(10px)",

    color: "#fff",

    outline: "none",

    fontSize: "14px",

    width: "100%",

    boxSizing:
      "border-box",
  },

  createBtn: {
    padding: "14px",

    borderRadius: "12px",

    border: "none",

    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",

    color: "#fff",

    fontWeight: "bold",

    cursor: "pointer",

    fontSize: "15px",
  },

  list: {
    display: "flex",

    flexDirection: "column",

    gap: "25px",

    marginTop: "40px",
  },

  card: {
    padding: "30px",

    borderRadius: "20px",

    background:
      "rgba(255,255,255,0.08)",

    backdropFilter:
      "blur(15px)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.4)",
  },

  title: {
    fontSize: "28px",

    marginBottom: "10px",
  },

  description: {
    color: "#cbd5e1",

    marginBottom: "15px",

    maxWidth: "700px",
  },

  text: {
    color: "#e2e8f0",

    marginBottom: "8px",

    fontSize: "15px",
  },

  editBtn: {
    padding: "12px 18px",

    background:
      "linear-gradient(135deg,#3b82f6,#2563eb)",

    border: "none",

    borderRadius: "12px",

    color: "#fff",

    fontWeight: "bold",

    cursor: "pointer",

    height: "fit-content",
  },

  deleteBtn: {
    padding: "12px 18px",

    background:
      "linear-gradient(135deg,#ef4444,#dc2626)",

    border: "none",

    borderRadius: "12px",

    color: "#fff",

    fontWeight: "bold",

    cursor: "pointer",

    height: "fit-content",
  },
};
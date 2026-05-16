import { useState } from "react";
import API from "../../api/API";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/api/auth/signup", {
        name,
        email,
        password,
        role,
      });

      alert("Signup successful ");
      navigate("/login");
    } catch (err) {
      alert("Signup failed ");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account </h2>
        <p style={styles.subtitle}>Join the Geofence System</p>

        <input
          placeholder="Full Name"
          style={styles.input}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email Address"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={styles.roleContainer}>

  <button
    type="button"

    onClick={() =>
      setRole("USER")
    }

    style={{
      ...styles.roleButton,

      ...(role === "USER"
        ? styles.activeRole
        : {}),
    }}
  >
    User
  </button>

  <button
    type="button"

    onClick={() =>
      setRole("ADMIN")
    }

    style={{
      ...styles.roleButton,

      ...(role === "ADMIN"
        ? styles.activeRole
        : {}),
    }}
  >
    Admin
  </button>

</div>

        <button
          onClick={handleSignup}
          style={styles.button}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Signup
        </button>

        <p style={styles.link} onClick={() => navigate("/login")}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at top left, #1e293b, #020617)",
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    padding: "40px",
    borderRadius: "20px",
    width: "400px", // 🔥 bigger
    textAlign: "center",
    boxShadow: "0 0 40px rgba(0,0,0,0.6)",
    border: "1px solid rgba(255,255,255,0.1)",
  },

  title: {
    color: "#fff",
    fontSize: "26px",
    marginBottom: "8px",
  },

  subtitle: {
    color: "#ccc",
    fontSize: "14px",
    marginBottom: "25px",
  },

  input: {
    width: "100%",
    padding: "14px",
    margin: "12px 0",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.2)",
    outline: "none",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    fontSize: "15px",
    boxSizing: "border-box", // 🔥 alignment fix
  },

  button: {
    width: "100%",
    padding: "14px",
    background:
      "linear-gradient(135deg, #3b82f6, #6366f1)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "20px",
    fontSize: "16px",
    transition: "0.3s",
  },

  link: {
    marginTop: "20px",
    color: "#60a5fa",
    cursor: "pointer",
    fontSize: "15px", // 🔥 bigger text
  },
  roleContainer: {

  display: "flex",

  gap: "12px",

  marginTop: "14px",

  marginBottom: "10px",
},

roleButton: {

  flex: 1,

  padding: "14px",

  borderRadius: "12px",

  border:
    "1px solid rgba(255,255,255,0.1)",

  background:
    "rgba(255,255,255,0.06)",

  color: "#fff",

  cursor: "pointer",

  fontSize: "15px",

  fontWeight: "600",

  transition: "0.3s",
},

activeRole: {

  background:
    "linear-gradient(135deg,#3b82f6,#6366f1)",

  boxShadow:
    "0 0 20px rgba(99,102,241,0.4)",
},

};
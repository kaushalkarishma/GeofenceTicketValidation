import { useState } from "react";
import API from "../../api/API";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/api/auth/login", {
        email,
        password,
      });
       console.log(res.data);
      const token =
  res.data.token ||
  res.data.jwt ||
  res.data.accessToken;

console.log("TOKEN:", token);

if (!token) {

  console.log(res.data);

  throw new Error(
    "Token not received"
  );
}

      // 🔥 SAVE TOKEN
      localStorage.setItem("token", token);

      // 🔥 DECODE ROLE FROM TOKEN
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.role;

      localStorage.setItem("role", role);

      alert("Login successful ");

      // 🔥 ROLE BASED REDIRECT
      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.log(err);

alert(
 err.response?.data?.error ||
    err.message ||
    "Login failed "
);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back </h2>
        <p style={styles.subtitle}>Login to continue</p>

        <input
          type="email"
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

        <button
          onClick={handleLogin}
          style={styles.button}
          onMouseOver={(e) =>
            (e.target.style.transform = "scale(1.05)")
          }
          onMouseOut={(e) =>
            (e.target.style.transform = "scale(1)")
          }
        >
          Login
        </button>

        <p style={styles.link} onClick={() => navigate("/signup")}>
          Don't have an account? Signup
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
    width: "400px",
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
    boxSizing: "border-box",
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
    fontSize: "15px",
  },
};
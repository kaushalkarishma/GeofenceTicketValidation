import {
  useNavigate,
  useLocation,
} from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const location = useLocation();

  // 🔥 TOKEN
  const token =
    localStorage.getItem("token");

  // 🔥 ROLE
  const role =
    localStorage.getItem("role");

  // 🔥 LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    navigate("/login");
  };

  // 🔥 NAV ITEM
  const navItem = (path, label) => (

    <span
      onClick={() => navigate(path)}

      style={{
        ...styles.link,

        ...(location.pathname === path
          ? styles.activeLink
          : {}),
      }}
    >
      {label}
    </span>
  );

  return (

    <div style={styles.navbar}>

      <div style={styles.navInner}>

        {/* 🔥 LOGO */}
        <div
          style={styles.logoContainer}

          onClick={() =>

            role === "ADMIN"
              ? navigate("/admin")
              : navigate("/dashboard")
          }
        >
          <h2 style={styles.logo}>
            GeoFence
          </h2>

          <span style={styles.rocket}>
            
          </span>
        </div>

        {/* 🔥 LINKS */}
        <div style={styles.links}>

          {token ? (

            <>
              {/* 🔥 ADMIN NAVBAR */}
              {role === "ADMIN" ? (

                <>
                  {navItem(
                    "/admin",
                    "Dashboard"
                  )}
                </>

              ) : (

                <>
                  {/* 🔥 USER NAVBAR */}
                  {navItem(
                    "/dashboard",
                    "Dashboard"
                  )}

                  {navItem(
                    "/events",
                    "Events"
                  )}

                  {navItem(
                    "/my-bookings",
                    "Bookings"
                  )}
                </>
              )}

              {/* 🔥 LOGOUT */}
              <button
                onClick={handleLogout}

                style={styles.logout}
              >
                Logout
              </button>
            </>

          ) : (

            <>
              {navItem(
                "/login",
                "Login"
              )}

              {navItem(
                "/signup",
                "Signup"
              )}
            </>
          )}

        </div>

      </div>

    </div>
  );
}

const styles = {

  navbar: {
    width: "100%",

    position: "fixed",

    top: 0,

    zIndex: 1000,

    backdropFilter: "blur(18px)",

    background:
      "rgba(2,6,23,0.75)",

    borderBottom:
      "1px solid rgba(255,255,255,0.08)",

    boxShadow:
      "0 8px 32px rgba(0,0,0,0.35)",
  },

  navInner: {
    maxWidth: "1300px",

    margin: "0 auto",

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    padding: "18px 40px",
  },

  logoContainer: {
    display: "flex",

    alignItems: "center",

    gap: "10px",

    cursor: "pointer",
  },

  logo: {
    color: "#fff",

    fontSize: "34px",

    fontWeight: "bold",

    letterSpacing: "1px",

    margin: 0,
  },

  rocket: {
    fontSize: "24px",
  },

  links: {
    display: "flex",

    alignItems: "center",

    gap: "28px",
  },

  link: {
    color: "#e2e8f0",

    fontSize: "17px",

    fontWeight: "500",

    cursor: "pointer",

    transition: "0.3s",

    position: "relative",
  },

  activeLink: {
    color: "#fff",

    borderBottom:
      "2px solid #8b5cf6",

    paddingBottom: "4px",
  },

  logout: {
    padding: "12px 20px",

    borderRadius: "12px",

    border: "none",

    background:
      "linear-gradient(135deg,#ef4444,#fb7185)",

    color: "#fff",

    cursor: "pointer",

    fontWeight: "bold",

    fontSize: "15px",

    transition: "0.3s",
  },
};
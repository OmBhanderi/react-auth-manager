import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { getCurrentUser } from "../utils/storage";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logout();
    if (currentUser?.role === "admin") {
      navigate("/admin/signin");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Header/Navbar */}
      <nav
        style={{
          backgroundColor: "#333",
          color: "white",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>
          {currentUser?.role === "admin" ? "Admin Panel" : "User Dashboard"}
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span>
            Welcome, {currentUser?.name || currentUser?.username || "User"}
          </span>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: "2rem" }}>{children}</main>
    </div>
  );
};

export default Layout;

import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/storage";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const currentUser = getCurrentUser();

  // Not logged in
  if (!currentUser) {
    return adminOnly ? (
      <Navigate to="/admin/signin" replace />
    ) : (
      <Navigate to="/signin" replace />
    );
  }

  // Logged in but trying to access admin route
  if (adminOnly && currentUser.role !== "admin") {
    return <Navigate to="/user/dashboard" replace />;
  }

  if (!adminOnly && currentUser.role === "admin") {
    return <Navigate to="/admin/panel" replace />;
  }

  return children;
};

export default PrivateRoute;

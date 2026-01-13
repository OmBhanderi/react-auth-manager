import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/storage";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  if (adminOnly && currentUser.role !== "admin") {
    return <Navigate to="/user/dashboard" replace />;
  }

  if (currentUser.role === "user" && adminOnly) {
    return <Navigate to="/user/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;

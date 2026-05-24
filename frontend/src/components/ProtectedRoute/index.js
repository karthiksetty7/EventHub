import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // 1. Wait for auth check
  if (isLoading) {
    return <Loader />;
  }

  // 2. Not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Role-based access control
  if (allowedRoles.length > 0) {
    const userRole = user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // 4. Allow access
  return children;
};

export default ProtectedRoute;

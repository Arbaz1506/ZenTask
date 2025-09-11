import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../context/userContext";

const PrivateRoute = ({ allowedRoles = [] }) => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();

  if (loading) {
    return <div className="p-4 text-gray-400">Checking authentication...</div>;
  }

  if (!user) {
    if (location.pathname === "/login") return <Outlet />;
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRole = user.role ? String(user.role).toLowerCase() : "";
  const allowed = allowedRoles.map((r) => String(r).toLowerCase());

  if (allowed.length > 0 && !allowed.includes(userRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-2">Access Denied</h1>
          <p className="text-gray-400">
            You don’t have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default PrivateRoute;

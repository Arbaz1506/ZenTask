import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);

        // Normalize role: "member" → "user"
        const normalizedRole =
          response.data.role === "member" ? "user" : response.data.role;

        setUser({ ...response.data, role: normalizedRole });
      } catch (error) {
        console.error("User not authenticated", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateUser = (userData) => {
    const normalizedRole =
      userData.role === "member" ? "user" : userData.role;

    setUser({ ...userData, role: normalizedRole });
    if (userData?.token) {
      localStorage.setItem("token", userData.token); // Save token
    }
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  // logout just clears user state, no navigation here
  const logout = () => {
    clearUser();
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

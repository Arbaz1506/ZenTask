import React, { useEffect, useState } from "react";
import { LuFileSpreadsheet, LuSearch } from "react-icons/lu";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserCard } from "../../components/Cards/UserCard";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all users
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      setAllUsers(response.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Download Excel report
  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
      alert("Failed to download report. Try again later.");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Filter users by search
  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="mt-5 mb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white">Team Members</h2>

          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <LuSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>

            {/* Download Button */}
            <button
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition"
              onClick={handleDownloadReport}
            >
              <LuFileSpreadsheet className="text-lg" />
              Download Report
            </button>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {loading ? (
            <p className="text-gray-300 col-span-full text-center">Loading users...</p>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => <UserCard key={user._id} userInfo={user} />)
          ) : (
            <p className="text-gray-400 col-span-full text-center">
              No users found.
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;

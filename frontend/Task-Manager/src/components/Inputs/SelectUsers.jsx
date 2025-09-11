import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuX, LuUsers } from "react-icons/lu";
import AvatarGroup from "../AvatarGroup";

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  // Fetch all users including admins
  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.USERS.GET_ALL_USERS}?includeAdmins=true`
      );
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Toggle user selection
  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Assign selected users
  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  // Avatars for selected users
  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl || "/default-avatar.png");

  return (
    <div className="w-full">
      {selectedUserAvatars.length === 0 ? (
        <button
          className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm flex items-center justify-center gap-2 hover:bg-white/20 transition"
          onClick={() => {
            setTempSelectedUsers(selectedUsers);
            setIsModalOpen(true);
          }}
        >
          <LuUsers className="text-sm" /> Add Members
        </button>
      ) : (
        <div
          className="cursor-pointer"
          onClick={() => {
            setTempSelectedUsers(selectedUsers);
            setIsModalOpen(true);
          }}
        >
          <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl w-96 p-5">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold text-lg">Select Users</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <LuX className="text-xl" />
              </button>
            </div>

            {/* User List */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {allUsers.map((user) => (
                <div
                  key={user._id}
                  onClick={() => toggleUserSelection(user._id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition ${
                    tempSelectedUsers.includes(user._id)
                      ? "bg-indigo-600 text-white"
                      : "bg-white/5 text-gray-200 hover:bg-white/10"
                  }`}
                >
                  <img
                    src={user.profileImageUrl || "/default-avatar.png"}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {user.name} {user.role === "admin" ? "(Admin)" : ""}
                    </span>
                    <span className="text-xs text-gray-400">{user.email}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectUsers;

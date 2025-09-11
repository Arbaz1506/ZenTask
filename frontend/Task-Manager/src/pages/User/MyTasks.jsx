import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import TaskCard from "../../components/Cards/TaskCard";
import { UserContext } from "../../context/userContext";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // ✅ navigate hook

  // Fetch tasks assigned to the current user
  const getUserTasks = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: { status: filterStatus === "All" ? "" : filterStatus },
      });

      const fetchedTasks = response.data?.tasks || [];
      setTasks(fetchedTasks);

      // Map status summary for tabs
      const statusSummary = response.data?.statusSummary || {};
      const statusArray = [
        { label: "All", count: statusSummary.all || fetchedTasks.length },
        { label: "Pending", count: statusSummary.pending || 0 },
        { label: "In Progress", count: statusSummary.inProgress || 0 },
        { label: "Completed", count: statusSummary.completed || 0 },
      ];
      setTabs(statusArray);
    } catch (error) {
      console.error("Error fetching user tasks:", error);
    }
  };

  useEffect(() => {
    if (user) getUserTasks();
  }, [filterStatus, user]);

  // ✅ Handle task click
  const handleTaskClick = (taskId) => {
    navigate(`/user/task-details/${taskId}`);
  };

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="my-5">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <h2 className="text-xl font-medium">My Tasks</h2>

          {tasks?.length > 0 && (
            <div className="flex items-center gap-3">
              <TaskStatusTabs
                tabs={tabs}
                activeTab={filterStatus}
                setActiveTab={setFilterStatus}
              />
            </div>
          )}
        </div>

        {/* Task Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tasks?.map((item) => (
            <TaskCard
              key={item._id}
              title={item.title || "No Title"}
              description={item.description || "No Description"}
              priority={item.priority || "Low"}
              status={item.status || "Pending"}
              progress={item.progress || 0}
              createdAt={item.createdAt || new Date().toISOString()}
              dueDate={item.dueDate || null}
              assignedTo={item.assignedTo?.map((u) => u.profileImageUrl) || []}
              attachmentCount={item.attachments?.length || 0}
              completedTodoCount={item.completedTodoCount || 0}
              todoChecklist={item.todoChecklist || []}
              onClick={() => handleTaskClick(item._id)} // ✅ pass click
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyTasks;

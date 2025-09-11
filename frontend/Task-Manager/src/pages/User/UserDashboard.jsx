// src/pages/Dashboard/UserDashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";

import InfoCard from "../../components/Cards/InfoCard";
import { addThousandsSeparator } from "../../utils/helper";
import TaskListTable from "../../components/TaskListTable";
import CustomPieChart from "../../components/Charts/CustomPieChart";
import CustomBarChart from "../../components/Charts/CustomBarChart";
import { LuArrowRight } from "react-icons/lu";

const UserDashboard = () => {
  // removed useUserAuth() — PrivateRoute handles redirects
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(true);

  // Fetch user dashboard data
  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_USER_DASHBOARD_DATA
      );
      console.log("📊 User Dashboard API Response:", response.data);

      // Use response.data.data if available, fallback to response.data
      setDashboardData(response.data?.data || response.data || {});
    } catch (error) {
      console.error("Error fetching user dashboard data:", error);
      setDashboardData({});
    } finally {
      setLoadingDashboard(false);
    }
  };

useEffect(() => {
  if (user) {
    getDashboardData();
  }
}, [user]); // run whenever user is set

  // Loading state
  if (!user || loadingDashboard)
    return <div className="p-4 text-gray-400">Loading your dashboard...</div>;

  // Navigate to all tasks
  const onSeeMore = () => navigate("/user/tasks");

  // Pie chart data (user-specific task distribution)
  const pieChartData = [
    {
      status: "Pending",
      count: dashboardData?.charts?.taskDistribution?.Pending || 0,
    },
    {
      status: "In Progress",
      count: dashboardData?.charts?.taskDistribution?.InProgress || 0,
    },
    {
      status: "Completed",
      count: dashboardData?.charts?.taskDistribution?.Completed || 0,
    },
    {
      status: "Overdue",
      count: dashboardData?.statistics?.overdueTasks || 0,
    },
  ];

  const COLORS_PIE = ["#F97316", "#6366F1", "#10B981", "#F43F5E"]; // orange, blue, green, red

  // Bar chart data (priority levels for user tasks)
  const barChartData = [
    {
      priority: "Low",
      count: dashboardData?.charts?.taskPriorityLevels?.Low || 0,
    },
    {
      priority: "Medium",
      count: dashboardData?.charts?.taskPriorityLevels?.Medium || 0,
    },
    {
      priority: "High",
      count: dashboardData?.charts?.taskPriorityLevels?.High || 0,
    },
  ];

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5">
        {/* Greeting */}
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            Welcome back, {user?.name} 👋
          </h2>
          <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
            {moment().format("dddd Do MMM YYYY")}
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <InfoCard
            label="My Tasks"
            value={addThousandsSeparator(
              dashboardData?.statistics?.totalTasks || 0
            )}
            color="bg-purple-500"
          />
          <InfoCard
            label="Pending"
            value={addThousandsSeparator(
              dashboardData?.statistics?.pendingTasks || 0
            )}
            color="bg-yellow-500/60"
          />
          <InfoCard
            label="Completed"
            value={addThousandsSeparator(
              dashboardData?.statistics?.completedTasks || 0
            )}
            color="bg-green-500/60"
          />
          <InfoCard
            label="Overdue"
            value={addThousandsSeparator(
              dashboardData?.statistics?.overdueTasks || 0
            )}
            color="bg-red-500/60"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {/* Pie Chart: Task Distribution */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-md text-gray-100">
            <h5 className="font-medium mb-3">My Task Distribution</h5>
            <CustomPieChart data={pieChartData} colors={COLORS_PIE} />
          </div>

          {/* Bar Chart: Tasks by Priority */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-md text-gray-100">
            <h5 className="font-medium mb-3">My Tasks by Priority</h5>
            <CustomBarChart data={barChartData} />
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-md text-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-lg font-medium">My Recent Tasks</h5>
            <button
              className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition"
              onClick={onSeeMore}
            >
              See All <LuArrowRight className="text-base" />
            </button>
          </div>
          <TaskListTable
            tableData={dashboardData?.charts?.recentTasks || []}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;

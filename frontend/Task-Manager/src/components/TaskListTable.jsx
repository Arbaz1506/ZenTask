// src/components/TaskListTable.jsx
import React from "react";
import moment from "moment";

const TaskListTable = ({ tableData = [] }) => {
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/20 text-green-400 border border-green-500/30";
      case "Pending":
        return "bg-purple-500/20 text-purple-400 border border-purple-500/30";
      case "InProgress":
      case "In Progress":
        return "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500/20 text-red-400 border border-red-500/30";
      case "Medium":
        return "bg-orange-500/20 text-orange-400 border border-orange-500/30";
      case "Low":
        return "bg-green-500/20 text-green-400 border border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-md mt-3">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="bg-white/10 text-gray-400 text-xs uppercase">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Priority</th>
            <th className="px-4 py-2">Created On</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((task) => (
              <tr
                key={task._id}
                className="border-b border-white/10 hover:bg-white/5 transition"
              >
                <td className="px-4 py-2">{task.title || "-"}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-md inline-block ${getStatusBadgeColor(
                      task.status
                    )}`}
                  >
                    {task.status || "-"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-md inline-block ${getPriorityBadgeColor(
                      task.priority
                    )}`}
                  >
                    {task.priority || "-"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {task.createdAt
                    ? moment(task.createdAt).format("Do MMM YYYY")
                    : "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="px-4 py-3 text-center text-gray-500 text-sm"
              >
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListTable;

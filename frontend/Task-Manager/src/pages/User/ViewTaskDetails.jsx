import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const ViewTaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-600 bg-cyan-100 border border-cyan-300";
      case "Completed":
        return "text-green-600 bg-green-100 border border-green-300";
      default:
        return "text-purple-600 bg-purple-100 border border-purple-300";
    }
  };

  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));
      const taskData = response.data;
      if (taskData.assignedTo?.some((u) => u._id === user._id) || user.role === "admin") {
        setTask(taskData);
      } else {
        setTask(null);
      }
    } catch (error) {
      console.error("Error fetching task details:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTodoChecklist = async (index) => {
    if (!task) return;
    const updatedChecklist = [...task.todoChecklist];
    updatedChecklist[index].completed = !updatedChecklist[index].completed;

    try {
      await axiosInstance.put(API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(task._id), {
        todoChecklist: updatedChecklist,
      });
      setTask({ ...task, todoChecklist: updatedChecklist });
    } catch (error) {
      console.error("Error updating checklist:", error);
    }
  };

  useEffect(() => {
    if (id && user) getTaskDetailsByID();
  }, [id, user]);

  if (loading)
    return (
      <DashboardLayout activeMenu="My Tasks">
        <div className="p-5 text-gray-500">Loading task details...</div>
      </DashboardLayout>
    );

  if (!task)
    return (
      <DashboardLayout activeMenu="My Tasks">
        <div className="p-5 text-red-500">You do not have access to this task.</div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="mt-5 space-y-6">

        {/* Task Header */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">{task.title}</h2>
            <span className={`px-3 py-1 rounded-full ${getStatusTagColor(task.status)}`}>
              {task.status}
            </span>
          </div>
          <p className="text-gray-200">{task.description || "No Description"}</p>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-1 rounded-full bg-white/20 text-white">
              Priority: {task.priority || "Low"}
            </span>
            <span className="px-4 py-1 rounded-full bg-white/20 text-white">
              Progress: {task.progress || 0}%
            </span>
          </div>
        </div>

        {/* Assigned Users */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg space-y-2">
          <h3 className="text-lg font-semibold text-white">Assigned To</h3>
          <div className="flex gap-3 flex-wrap">
            {task.assignedTo?.length > 0 ? (
              task.assignedTo.map((u, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <img
                    src={u.profileImageUrl}
                    alt={u.name || "User"}
                    className="w-12 h-12 rounded-full border-2 border-white/30"
                  />
                  <span className="text-white text-sm mt-1">{u.name || "User"}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-300">No users assigned.</p>
            )}
          </div>
        </div>

        {/* Attachments */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg space-y-2">
          <h3 className="text-lg font-semibold text-white">Attachments</h3>
          {task.attachments?.length > 0 ? (
            <ul className="space-y-1">
              {task.attachments.map((file, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => window.open(file.url, "_blank")}
                    className="text-cyan-300 hover:text-cyan-400 underline"
                  >
                    {file.name}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300">No attachments.</p>
          )}
        </div>

        {/* Todo Checklist */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg space-y-2">
          <h3 className="text-lg font-semibold text-white">Todo Checklist</h3>
          {task.todoChecklist?.length > 0 ? (
            <ul className="space-y-2">
              {task.todoChecklist.map((todo, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => updateTodoChecklist(idx)}
                    className="accent-cyan-400 w-5 h-5"
                  />
                  <span className={todo.completed ? "line-through text-gray-300" : "text-white"}>
                    {todo.title || todo.text || "Untitled todo"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300">No checklist items</p>
          )}
        </div>

        {/* Dates */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg space-y-1 text-gray-300 text-sm">
          <div>Created At: {new Date(task.createdAt).toLocaleString()}</div>
          <div>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleString() : "N/A"}</div>
        </div>

        {/* Back Button */}
        <div>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg"
          >
            Back
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;

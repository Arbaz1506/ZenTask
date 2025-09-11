// src/pages/Admin/CreateTask.jsx
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { PRIORITY_DATA } from "../../utils/data";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";

import SelectDropdown from "../../components/Inputs/SelectDropdown";
import SelectUsers from "../../components/Inputs/SelectUsers";
import TodoListInput from "../../components/Inputs/TodoListInput";
import AddAttachmentsInput from "../../components/Inputs/AddAttachmentsInput";
import DeleteAlert from "../../components/DeleteAlert";
import Modal from "../../components/Modal";

const CreateTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { taskId } = location.state || {};

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // --- Handle form value changes ---
  const handleValueChange = (key, value) => {
    setTaskData((prev) => ({ ...prev, [key]: value }));
  };

  // --- Fetch Task by ID for editing ---
  useEffect(() => {
    const getTaskDetailsByID = async () => {
      if (!taskId) return;
      setLoading(true);
      try {
        const res = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId));
        const data = res.data;
        setTaskData({
          title: data.title,
          description: data.description,
          priority: data.priority,
          dueDate: data.dueDate ? moment(data.dueDate).format("YYYY-MM-DD") : null,
          assignedTo: data.assignedTo?.map((user) => user._id) || [],
          todoChecklist: data.todoChecklist || [],
          attachments: data.attachments || [],
        });
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch task details");
      } finally {
        setLoading(false);
      }
    };
    getTaskDetailsByID();
  }, [taskId]);

  // --- Clear Form ---
  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
    setError("");
  };

  // --- Create / Update Task ---
  const handleSubmit = async () => {
    if (!taskData.title.trim()) {
      setError("Task title is required");
      toast.error("Task title is required");
      return;
    }
    setError("");
    setLoading(true);
    try {
      if (taskId) {
        await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), {
          ...taskData,
          dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null,
        });
        toast.success("Task updated successfully!");
      } else {
        await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
          ...taskData,
          dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null,
        });
        toast.success("Task created successfully!");
        clearData();
      }
      navigate("/admin/tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // --- Delete Task ---
  const deleteTask = async () => {
    if (!taskId) {
      toast.error("Task ID is missing");
      return;
    }
    try {
      setLoading(true);
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
      toast.success("Task deleted successfully!");
      setShowDeleteModal(false);
      navigate("/admin/tasks");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="h-full w-full px-6 py-6">
        <div className="h-full w-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {taskId ? "Update Task" : "Create Task"}
            </h2>

            {taskId && (
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-400/30 hover:bg-red-500/20 hover:shadow-md hover:shadow-red-500/30 transition-all"
                onClick={() => setShowDeleteModal(true)}
                disabled={loading}
              >
                <LuTrash2 className="text-lg" /> Delete
              </button>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-400/30 text-red-400">
              {error}
            </div>
          )}

          {/* --- FORM --- */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Task Title *</label>
              <input
                placeholder="Task Title"
                className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                value={taskData.title}
                onChange={({ target }) => handleValueChange("title", target.value)}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Description</label>
              <textarea
                placeholder="Describe the task"
                className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                rows={4}
                value={taskData.description}
                onChange={({ target }) => handleValueChange("description", target.value)}
              />
            </div>

            {/* Priority / Due Date / Assign */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-4">
                <label className="block text-sm font-medium text-gray-200 mb-1">Priority</label>
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                />
              </div>

              <div className="col-span-12 md:col-span-4">
                <label className="block text-sm font-medium text-gray-200 mb-1">Due Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  value={taskData.dueDate || ""}
                  onChange={({ target }) => handleValueChange("dueDate", target.value)}
                />
              </div>

              <div className="col-span-12 md:col-span-4">
                <label className="block text-sm font-medium text-gray-200 mb-1">Assign To</label>
                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) => handleValueChange("assignedTo", value)}
                />
              </div>
            </div>

            {/* TODO Checklist */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">TODO Checklist</label>
              <TodoListInput
                todoList={taskData.todoChecklist}
                setTodoList={(value) => handleValueChange("todoChecklist", value)}
              />
            </div>

            {/* Attachments */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Add Attachments</label>
              <AddAttachmentsInput
                attachments={taskData.attachments}
                setAttachments={(value) => handleValueChange("attachments", value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-10">
            <button
              onClick={clearData}
              className="px-5 py-2.5 rounded-xl bg-white/10 text-gray-200 border border-white/20 hover:bg-white/20 hover:shadow-md transition"
              disabled={loading}
            >
              Clear
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2.5 rounded-xl bg-indigo-500/80 text-white hover:bg-indigo-500 hover:shadow-md hover:shadow-indigo-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Saving..." : taskId ? "Update Task" : "Create Task"}
            </button>
          </div>

          {/* --- DELETE MODAL --- */}
          <Modal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            title="Delete Task"
          >
            <DeleteAlert
              content="Are you sure you want to delete this task?"
              onDelete={deleteTask}
            />
          </Modal>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateTask;

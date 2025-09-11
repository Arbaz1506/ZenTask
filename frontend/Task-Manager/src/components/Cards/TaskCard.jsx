import React from "react";
import { LuPaperclip, LuArrowRight } from "react-icons/lu";
import Progress from "../layouts/Progress";
import moment from "moment";

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCount,
  todoChecklist,
  onClick,
}) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "bg-cyan-500/20 text-cyan-300";
      case "Completed":
        return "bg-green-500/20 text-green-300";
      default:
        return "bg-violet-500/20 text-violet-300";
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case "Low":
        return "bg-emerald-500/20 text-emerald-300";
      case "Medium":
        return "bg-amber-500/20 text-amber-300";
      default:
        return "bg-rose-500/20 text-rose-300";
    }
  };

  return (
    <div
      onClick={onClick}
      className="relative group p-6 rounded-2xl border border-gray-700/30 
      bg-white/5 backdrop-blur-md shadow-lg 
      transition-transform duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-2xl"
    >
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-90 rounded-2xl flex items-center justify-center transition-all duration-300">
        <span className="flex items-center gap-2 text-white font-semibold text-sm shadow-lg px-4 py-2 bg-gray-900/50 rounded-full backdrop-blur-sm">
          View Details <LuArrowRight className="text-base" />
        </span>
      </div>

      {/* Header tags */}
      <div className="flex justify-between items-center mb-4">
        <span
          className={`text-[11px] font-medium px-3 py-1 rounded-full ${getStatusTagColor()}`}
        >
          {status}
        </span>
        <span
          className={`text-[11px] font-medium px-3 py-1 rounded-full ${getPriorityTagColor()}`}
        >
          {priority} Priority
        </span>
      </div>

      {/* Title & Description */}
      <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">
        {title}
      </h3>
      <p className="text-sm text-gray-300 line-clamp-2 mb-4">{description}</p>

      {/* Progress */}
      <p className="text-xs text-gray-400 mb-1">
        Task Done:{" "}
        <span className="font-medium text-white">
          {completedTodoCount} / {todoChecklist?.length || 0}
        </span>
      </p>
      <Progress progress={progress} status={status} />

      {/* Dates */}
      <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
        <p>Created: {moment(createdAt).format("Do MMM")}</p>
        <p className="font-medium text-white">
          Due: {moment(dueDate).format("Do MMM")}
        </p>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-5">
        {/* Assignees */}
        <div className="flex -space-x-2">
          {assignedTo?.slice(0, 3).map((avatar, i) =>
            avatar ? (
              <img
                key={i}
                src={avatar}
                alt="assignee"
                className="w-8 h-8 rounded-full border-2 border-gray-800 object-cover shadow-sm"
              />
            ) : (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-gray-800 bg-gray-600 flex items-center justify-center text-xs text-white shadow-sm"
              >
                ?
              </div>
            )
          )}
          {assignedTo?.length > 3 && (
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-xs text-gray-300 border">
              +{assignedTo.length - 3}
            </span>
          )}
        </div>

        {/* Attachments */}
        {attachmentCount > 0 && (
          <div className="flex items-center gap-1 text-gray-300 text-sm">
            <LuPaperclip className="text-lg" />
            <span>{attachmentCount}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;

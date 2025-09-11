import React from "react";

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-md">
      <p className="text-sm text-gray-200">{content}</p>
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:shadow-md hover:shadow-red-500/30 transition"
          onClick={onDelete}
        >
          Delete
          
        </button>
      </div>
    </div>
    
  );
};

export default DeleteAlert;

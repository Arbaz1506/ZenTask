// src/components/ui/Modal.jsx
import React from "react";
import { LuX } from "react-icons/lu";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-2xl shadow-lg w-[90%] max-w-lg p-5 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <LuX className="text-xl" />
        </button>

        {/* Title */}
        {title && (
          <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        )}

        {/* Body */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

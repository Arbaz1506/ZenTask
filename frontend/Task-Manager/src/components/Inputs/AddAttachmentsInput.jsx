// src/components/Inputs/AddAttachmentsInput.jsx
import React, { useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
import { LuPaperclip } from "react-icons/lu";

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [option, setOption] = useState("");

  // Function to handle adding an attachment
  const handleAddOption = () => {
    if (option.trim()) {
      setAttachments([...attachments, option.trim()]);
      setOption("");
    }
  };

  // Function to handle deleting an attachment
  const handleDeleteOption = (index) => {
    const updatedArr = attachments.filter((_, idx) => idx !== index);
    setAttachments(updatedArr);
  };

  return (
    <div className="w-full">
      {/* Input and Add Button */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center flex-1 bg-white/10 px-3 py-2 rounded-lg text-gray-200">
          <LuPaperclip className="text-gray-400 mr-2" />
          <input
            type="text"
            value={option}
            onChange={(e) => setOption(e.target.value)}
            placeholder="Add attachment link or name"
            className="bg-transparent outline-none flex-1 text-sm placeholder-gray-400"
          />
        </div>
        <button
          type="button"
          onClick={handleAddOption}
          className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition"
        >
          <HiMiniPlus />
        </button>
      </div>

      {/* Attachments List */}
      <ul className="space-y-2">
        {attachments.map((att, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-white/5 px-3 py-2 rounded-lg text-sm text-gray-200"
          >
            <span className="truncate">{att}</span>
            <button
              type="button"
              onClick={() => handleDeleteOption(index)}
              className="text-red-400 hover:text-red-500"
            >
              <HiOutlineTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddAttachmentsInput;

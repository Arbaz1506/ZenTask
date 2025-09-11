// src/components/Inputs/TodoListInput.jsx
import React from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";

const TodoListInput = ({ todoList, setTodoList }) => {
  // Add a new empty todo item
  const handleAdd = () => {
    setTodoList([...todoList, { text: "", completed: false }]);
  };

  // Update todo text
  const handleChange = (index, value) => {
    const updated = [...todoList];
    updated[index].text = value;
    setTodoList(updated);
  };

  // Remove todo item
  const handleRemove = (index) => {
    const updated = todoList.filter((_, i) => i !== index);
    setTodoList(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-600 text-white rounded-md hover:bg-purple-500 transition"
        >
          <HiMiniPlus className="w-4 h-4" />
          Add
        </button>
      </div>

      {todoList.length === 0 && (
        <p className="text-xs text-gray-400">No todo items yet.</p>
      )}

      <div className="space-y-2">
        {todoList.map((todo, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-white/5 p-2 rounded-md"
          >
            <input
              type="text"
              value={todo.text}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`Todo ${index + 1}`}
              className="flex-1 px-2 py-1 bg-transparent text-sm text-gray-100 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:border-purple-500"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-red-400 hover:text-red-300"
            >
              <HiOutlineTrash className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoListInput;

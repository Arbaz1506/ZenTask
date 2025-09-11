// src/components/ui/AvatarGroup.jsx
import React from "react";

const AvatarGroup = ({ avatars = [], maxVisible = 3 }) => {
  return (
    <div className="flex items-center">
      {avatars.slice(0, maxVisible).map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`Avatar ${index}`}
          className={`w-9 h-9 rounded-full border-2 border-gray-900 ${
            index === 0 ? "ml-0" : "-ml-3"
          }`}
        />
      ))}

      {avatars.length > maxVisible && (
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-600 text-white text-xs font-medium border-2 border-gray-900 -ml-3">
          +{avatars.length - maxVisible}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;

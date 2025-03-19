"use client";
import React, { useEffect, useState } from "react";

const NewsLetterSection = ({ setAddDefaultApp, widgetData }) => {
  const editData = widgetData?.thumbnail ? JSON.parse(widgetData.thumbnail) : null;

  const [name, setName] = useState(editData?.name || false);

  useEffect(() => {
    setAddDefaultApp((prev) => ({
      ...prev,
      thumbnail: JSON.stringify({ email: true, name }), // Ensure email is always true
    }));
  }, [name, setAddDefaultApp]); // Include setAddDefaultApp in dependencies

  return (
    <div className="flex items-center gap-2 my-2">
      <input
        type="checkbox"
        id="socialMediaButton"
        checked={name}
        onChange={(e) => setName(e.target.checked)} // Update state directly
        className="w-5 h-5 accent-green-500 cursor-pointer peer"
      />

      <label
        htmlFor="socialMediaButton"
        className="text-gray-700 text-sm font-medium cursor-pointer"
      >
        Show name field
      </label>
    </div>
  );
};

export default NewsLetterSection;

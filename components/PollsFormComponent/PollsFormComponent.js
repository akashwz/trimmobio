"use client";
import React, { useEffect, useState } from "react";

const PollsFormComponent = ({ setAddDefaultApp, widgetData }) => {
  const editData = widgetData?.content ? JSON.parse(widgetData?.content) : {};
  const [pollData, setPollData] = useState({
    question: editData?.question,
    options: editData?.options || ["", ""],
  });

  const handleQuestionChange = (e) => {
    setPollData({ ...pollData, question: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...pollData?.options];
    updatedOptions[index] = value;
    setPollData({ ...pollData, options: updatedOptions });
  };

  useEffect(() => {
    const updatedUrl = JSON.stringify(pollData);
    setAddDefaultApp((prev) => ({ ...prev, content: updatedUrl }));
  }, [pollData, setAddDefaultApp]);

  const addOption = () => {
    setPollData({
      ...pollData,
      options: [...pollData.options, ""],
    });
  };

  const removeOption = (index) => {
    if (pollData.options?.length > 2) {
      const updatedOptions = pollData.options?.filter((_, i) => i !== index);
      setPollData({ ...pollData, options: updatedOptions });
    } else {
      alert("A poll must have at least two options.");
    }
  };

  return (
    <div className="bg-white border rounded-lg px-8 py-6 mx-auto my-8 w-full">
      <form>
        <div className="mb-2">
          <label className="block text-gray-700 text-start font-medium mb-2">Question</label>
          <input
            type="text"
            className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
            placeholder="Enter your poll question"
            value={pollData?.question}
            onChange={handleQuestionChange}
            required
          />
        </div>

        {pollData?.options?.map((option, index) => (
          <div key={index} className="mb-2 flex items-center">
            <input
              type="text"
              className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
              value={option}
              placeholder={`Option ${index + 1}`}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
            {pollData?.options?.length > 2 && (
              <button
                type="button"
                className="ml-2 text-red-500 font-bold"
                onClick={() => removeOption(index)}
              >
                ✖
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="bg-green-400 hover:bg-[#ebff57] hover:text-[#000] text-white font-medium py-2 px-4 rounded-full shadow-md transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white"
          onClick={addOption}
        >
          + Add Option
        </button>
      </form>
    </div>
  );
};

export default PollsFormComponent;

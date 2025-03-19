"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const DigitalDownloadsComponent = ({ setAddDefaultApp }) => {
  const [item, setItem] = useState({
    file_name: "",
    file_description: "",
    file_link: "",
    file_size: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const updatedUrl = JSON.stringify(item);
    setAddDefaultApp((prev) => ({ ...prev, content: updatedUrl }));
  }, [item, setAddDefaultApp]);

  const handleFileLinkChange = async (e) => {
    const url = e.target.value;
    setItem((prev) => ({ ...prev, file_link: url }));
    setError("");

    if (!url.startsWith("https://")) {
      setError("Only HTTPS links are allowed");
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}app/file`, {
        url: url,
      });
      if (response?.data?.code === 200) {
        setItem((prev) => ({ ...prev, file_size: response?.data?.data?.fileSize }));
        setAddDefaultApp((prev) => ({ ...prev, url: url }));
      } else {
        setError("Unable to fetch file size");
        setItem((prev) => ({ ...prev, file_size: "" }));
        setAddDefaultApp((prev) => ({ ...prev, url: "" }));
      }
    } catch (error) {
      setError("Failed to retrieve file information");
      setItem((prev) => ({ ...prev, file_size: "" }));
      setAddDefaultApp((prev) => ({ ...prev, url: "" }));
    }
  };

  return (
    <div className="bg-white border rounded-lg p-4 mx-auto my-2 w-full">
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-start font-medium mb-2">File Name</label>
          <input
            type="text"
            className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
            value={item?.file_name}
            onChange={(e) => setItem((prev) => ({ ...prev, file_name: e.target.value }))}
          />
        </div>
        <div className="mb-1">
          <label className="block text-gray-700 text-start font-medium mb-2">
            File Description
          </label>
          <textarea
            type="text"
            className="w-full bg-transparent rounded-lg border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
            value={item?.file_description}
            onChange={(e) => setItem((prev) => ({ ...prev, file_description: e.target.value }))}
          />
        </div>

        <div className="mb-1 text-start">
          <label className="block text-gray-700 text-start font-medium mb-2">Download Link</label>
          <input
            type="text"
            className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
            value={item?.file_link}
            onChange={handleFileLinkChange}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <div className="mb-1">
          <label className="block text-gray-700 text-start font-medium mb-2">File Size</label>
          <input
            type="text"
            className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
            value={item?.file_size}
            readOnly
          />
        </div>
      </form>
    </div>
  );
};

export default DigitalDownloadsComponent;

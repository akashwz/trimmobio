import { faceBookItem } from "@/redux/Action/auth.action";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FaceBookComponent = ({ setAddDefaultApp }) => {
  const dispatch = useDispatch();
  const { faceBookData } = useSelector((state) => state?.authReducer);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(faceBookItem()).finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (faceBookData?.length > 0) {
      setSelectedId(faceBookData[0]?.id);
      setAddDefaultApp((prev) => ({ ...prev, url: faceBookData[0]?.id }));
    }
  }, [faceBookData, setAddDefaultApp]);

  const handleCheckboxChange = (id) => {
    setSelectedId(id === selectedId ? null : id);
    setAddDefaultApp((prev) => ({ ...prev, url: id === selectedId ? null : id }));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Facebook Data</h2>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : faceBookData?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {faceBookData?.map((item) => (
            <div
              key={item?.id}
              onClick={() => handleCheckboxChange(item?.id)}
              className={`bg-white shadow-md rounded-lg p-5 border cursor-pointer border-gray-200 transition-transform transform hover:scale-[1.03] hover:shadow-lg duration-200 min-h-[120px] relative ${
                selectedId === item?.id ? "border-blue-500" : ""
              }`}
            >
              <input
                type="checkbox"
                className="absolute top-3 right-3 w-4 h-4 cursor-pointer peer accent-green-500"
                checked={selectedId === item?.id}
                onChange={() => handleCheckboxChange(item?.id)}
                onClick={(e) => e.stopPropagation()}
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{item?.name}</h3>
              <p className="text-gray-600 break-words">
                <strong>Category:</strong> {item?.category || "N/A"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No Facebook data found.</p>
      )}
    </div>
  );
};

export default FaceBookComponent;

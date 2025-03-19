import React, { useEffect, useState } from "react";

const DiscountCodeComponent = ({ setAddDefaultApp, widgetData }) => {
  const editData = widgetData?.thumbnail ? JSON.parse(widgetData.thumbnail) : null;

  const [formData, setFormData] = useState({
    couponName: editData?.couponName || "",
    couponCode: editData?.couponCode || "",
  });
  const [error, setError] = useState({ couponName: "", couponCode: "" });

  const validateInput = (name, value) => {
    if (name === "couponName") {
      return /^[a-zA-Z ]*$/.test(value); // Only letters and spaces
    }
    if (name === "couponCode") {
      return /^[a-zA-Z0-9 ]*$/.test(value); // Letters, numbers, and spaces
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (validateInput(name, value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setError((prev) => ({ ...prev, [name]: "" }));
    } else {
      setError((prev) => ({
        ...prev,
        [name]:
          name === "couponName"
            ? "Coupon name can only contain letters"
            : "Coupon code can only contain letters, numbers.",
      }));
    }
  };

  useEffect(() => {
    const updatedUrl = JSON.stringify(formData);
    setAddDefaultApp((prev) => ({ ...prev, thumbnail: updatedUrl }));
  }, [formData, setAddDefaultApp]);

  return (
    <div className="bg-white border rounded-lg px-4 py-2 mx-auto my-4 w-full">
      <h2 className="text-xl font-semibold text-center mb-4">Create Discount Code</h2>

      <div>
        <div className="my-2 text-start">Coupon name</div>
        <input
          type="text"
          name="couponName"
          value={formData.couponName}
          onChange={handleChange}
          placeholder="Enter coupon name"
          required
          className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
        />
        {error.couponName && <p className="text-red-500 text-sm">{error.couponName}</p>}
      </div>

      <div>
        <div className="my-2 text-start">Coupon code</div>
        <input
          type="text"
          name="couponCode"
          value={formData.couponCode}
          onChange={handleChange}
          placeholder="Enter coupon code"
          required
          className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
        />
        {error.couponCode && <p className="text-red-500 text-sm">{error.couponCode}</p>}
      </div>
    </div>
  );
};

export default DiscountCodeComponent;

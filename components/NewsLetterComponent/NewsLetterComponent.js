import ToastNotification from "@/controller/ToastNotification";
import { getBio } from "@/redux/Action/auth.action";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

const NewsLetterComponent = ({ item, bioData, activeTabPreview, buttonStyle, buttonClass }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const addNewsLetterData = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      ToastNotification.error("Email cannot be empty.");
      return;
    }

    if (!validateEmail(email)) {
      ToastNotification.error("Please enter a valid email address.");
      return;
    }

    if (!bioData?.username) {
      ToastNotification.error("Username not found");
      return;
    }

    try {
      const updatedContent = [
        ...((item?.content && JSON.parse(item?.content)) || []),
        { email, name },
      ];

      const payload = {
        user_id: bioData?._id,
        content: JSON.stringify(updatedContent),
        type: activeTabPreview === "Links" ? "link" : "shop",
      };

      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}bio/guest/${item?._id}`, payload);

      dispatch(getBio(bioData?.username));
      ToastNotification.success("Successfully subscribed!");

      // ✅ Set subscribed state to true
      setIsSubscribed(true);
    } catch (error) {
      console.error("Error setting newsletter data:", error);
      ToastNotification.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="flex justify-center flex-col items-center"
      // style={buttonStyle}
    >
      {isSubscribed ? (
        // ✅ Success message after subscription
        <div className="text-center">
          <p className="text-green-500 font-medium text-lg">Thank you, you're subscribed!</p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-2 max-w-lg">{item?.description}</p>
          <form onSubmit={addNewsLetterData} className="w-full">
            <div className="flex flex-col items-center gap-3 w-full">
              {item?.thumbnail && JSON.parse(item?.thumbnail)?.name === true && (
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-green-400 hover:bg-[#ebff57] hover:text-[#000] text-white font-medium py-2 px-8 rounded-full shadow-md transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white"
              >
                Subscribe
              </button>
            </div>
          </form>
          {item?.description && (
            <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>
              {item?.description}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default NewsLetterComponent;

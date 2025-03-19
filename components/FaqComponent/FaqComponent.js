"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown, X } from "react-bootstrap-icons";
import ReactDragListView from "react-drag-listview";

const FaqComponent = ({ setAddDefaultApp, widgetData }) => {
  const editData = widgetData?.thumbnail ? JSON.parse(widgetData.thumbnail) : null;

  const [faqList, setFaqList] = useState(editData || []);
  const [item, setItem] = useState({ faq_question: "", faq_ans: "" });
  const [error, setError] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleAddFaq = () => {
    if (!item?.faq_question.trim() || !item?.faq_ans.trim()) {
      setError("Both fields are required");
      return;
    }
    setFaqList([...faqList, item]);
    setItem({ faq_question: "", faq_ans: "" });
    setError("");
  };

  useEffect(() => {
    const updatedUrl = JSON.stringify(faqList);
    setAddDefaultApp((prev) => ({ ...prev, thumbnail: updatedUrl }));
  }, [faqList, setAddDefaultApp]);

  const handleDragParent = {
    onDragEnd(dragIndex, hoverIndex) {
      const updatedList = [...faqList];
      const [draggedItem] = updatedList.splice(dragIndex, 1);
      updatedList.splice(hoverIndex, 0, draggedItem);
      setFaqList(updatedList);
    },
    nodeSelector: ".faq-drag-item",
    handleSelector: "div",
  };

  const handleRemoveFaq = (index) => {
    setFaqList(faqList?.filter((_, i) => i !== index));
  };

  const toggleFaq = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-white border rounded-lg px-4 py-2 mx-auto my-4 w-full">
      <form className="flex-shrink-0">
        <div>
          <div className="my-2 text-start">FAQ question</div>
          <input
            type="text"
            className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
            value={item?.faq_question}
            onChange={(e) => setItem({ ...item, faq_question: e.target.value })}
          />
        </div>

        <div>
          <div className="my-2 text-start">FAQ answer</div>
          <textarea
            className="w-full bg-transparent rounded-lg border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
            value={item?.faq_ans}
            onChange={(e) => setItem({ ...item, faq_ans: e.target.value })}
          />
        </div>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          type="button"
          className="bg-green-400 hover:bg-[#ebff57] hover:text-[#000] text-white font-medium py-2 px-8 rounded-full shadow-md transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white"
          onClick={handleAddFaq}
        >
          Add FAQ
        </button>
      </form>

      {faqList?.length > 0 && (
        <div className="mt-3">
          <h3 className="text-lg font-semibold mb-2">FAQ List</h3>
          <div className="border rounded-lg p-4 max-h-80 overflow-y-auto">
            <ReactDragListView {...handleDragParent}>
              {faqList?.map((faq, index) => (
                <div key={index} className="bg-gray-100 border rounded-lg mb-2 p-2 faq-drag-item">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-medium text-gray-900">{faq?.faq_question}</span>
                    <X
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFaq(index);
                      }}
                      width={25}
                      height={25}
                    />
                  </div>
                  <div className="mt-1 border-t pt-1 text-gray-700">
                    <p>{faq?.faq_ans}</p>
                  </div>
                </div>
              ))}
            </ReactDragListView>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqComponent;

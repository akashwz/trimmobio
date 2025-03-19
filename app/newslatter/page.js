"use client";

import { getNewslatter } from "@/redux/Action/auth.action";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Newslatter = () => {
  const dispatch = useDispatch();
  const { newslatterData } = useSelector((state) => state?.authReducer);

  useEffect(() => {
    dispatch(getNewslatter("67a03fb743859a78cba94114"));
  }, [dispatch]);

  return (
    <div className="relative flex-grow p-2 lg:p-5 overflow-y-auto h-screen">
      <div className="w-[100%] lg:w-[80%] flex flex-col p-4 mx-auto mb-14">
        <h1 className="sm:text-[1.75rem] text-lg font-semibold">Newsletters</h1>
        <div className="space-y-6 mt-4">
          {newslatterData?.map((newsletter) => (
            <div
              key={newsletter?._id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
            >
              <h6 className="text-xl font-semibold text-gray-800 mb-2">
                Newslatter name : {newsletter?.name}
              </h6>
              {/* <p className="text-gray-500 mb-2 flex items-center">
                <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full text-xs font-medium">
                  {newsletter?.widget_name}
                </span>
              </p> */}
              <Accordion>
                <AccordionSummary>📜 {newsletter?.name}</AccordionSummary>
                <AccordionDetails>
                  <div className="grid gap-3 mt-2">
                    {newsletter?.content && JSON.parse(newsletter?.content).length > 0 ? (
                      JSON.parse(newsletter?.content).map((user, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg shadow-sm"
                        >
                          <p className="text-gray-800 font-medium">
                            👤 <strong>{user?.name}</strong>
                          </p>
                          <p className="text-gray-600 text-sm">📧 {user?.email}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center">No data found</p>
                    )}
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newslatter;

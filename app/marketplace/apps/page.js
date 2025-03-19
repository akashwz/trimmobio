"use client";

import API from "@/api";
import Footer from "@/components/lending/Footer";
import Header from "@/components/lending/Header";
import Link from "next/link";
import { useEffect, useState } from "react";

const Apps = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API({ url: `plateforms?type=${["third party"]}`, method: "get" });
        const data = await response;
        setApps(data?.data?.data);
      } catch (error) {
        console.error("Error fetching apps:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <header className="rounded-[15px] relative w-full h-80 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center flex-col gap-4">
          <Header />
          <div className="w-full text-center mt-5">
            <h1 className="text-4xl font-bold">All Link Apps</h1>
          </div>
        </header>

        <main className="flex-1 w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-[-50px] relative mb-8">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 cursor-pointer">
              {apps?.map((obj, index) => (
                <Link
                  href={`apps/${obj?.slug_name}`}
                  key={index}
                  className="bg-white shadow-md rounded-lg p-5 border border-gray-200"
                >
                  <div className="flex items-start gap-3 ">
                    <img src={obj?.svg} />
                    <div>
                      <h3 className="font-semibold text-lg">{obj?.name}</h3>
                      <p className="text-gray-600 text-sm">{obj?.short_description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Apps;

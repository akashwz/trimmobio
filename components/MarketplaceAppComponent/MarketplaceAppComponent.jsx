"use client";

import API from "@/api";
import Footer from "@/components/lending/Footer";
import Header from "@/components/lending/Header";
import React, { useEffect, useState } from "react";

const MarketplaceAppComponent = ({ params }) => {
  const unwrappedParams = React.use(params);
  const slug = unwrappedParams?.slug;
  const [appData, setAppData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const categoriesRes = await API({ url: `plateforms/${slug}`, method: "get" });

        const [appData] = await Promise.all([categoriesRes]);

        if (isMounted) {
          setAppData(appData?.data?.data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading)
    return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appData?.overview_image?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`overview-${index}`}
                className="object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
          <div className="mt-4">
            <h1 className="text-4xl font-bold">{appData?.name}</h1>
            <p className="mt-4">{appData?.long_description}</p>
          </div>

          {error && (
            <div className="text-red-600 text-center py-4 bg-red-100 rounded-lg">{error}</div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default MarketplaceAppComponent;

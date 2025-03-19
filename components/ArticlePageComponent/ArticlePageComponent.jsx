"use client";

import API from "@/api";
import Footer from "@/components/lending/Footer";
import Header from "@/components/lending/Header";
import moment from "moment";
import React, { useEffect, useState, useRef } from "react";

const ArticlePageComponent = ({ params }) => {
  const unwrappedParams = React.use(params);
  const slug = unwrappedParams?.slug;
  const [articleData, setArticleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headings, setHeadings] = useState([]);
  const contentRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await API({ url: `articles/${slug}`, method: "get" });
        const data = await response;
        if (isMounted) {
          setArticleData(data?.data?.data);
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

  useEffect(() => {
    if (articleData?.long_description && contentRef.current) {
      // Extract all h2 elements dynamically after content is loaded
      const h2Elements = Array.from(contentRef.current.querySelectorAll("h2"));

      // Update headings with unique ids based on the heading text
      const headingsWithIds = h2Elements.map((el, index) => {
        const id = `heading-${index}`; // You can use a better ID strategy here
        el.id = id; // Assign id to each h2 dynamically
        return { id, text: el.innerText };
      });
      setHeadings(headingsWithIds);
    }
  }, [articleData]);

  useEffect(() => {
    if (articleData?.long_description && contentRef.current) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(articleData.long_description, "text/html");

      const headingElements = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
      let hasUpdated = false; // Track if we made any changes

      const headingsArray = Array.from(headingElements).map((heading, index) => {
        if (!heading.id) {
          // Only update if the heading has no ID
          let id = heading.textContent
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-") // Convert text to URL-friendly format
            .replace(/^-+|-+$/g, ""); // Trim hyphens

          id = id + `heading-${index}`; // Fallback ID if text is empty
          heading.id = id; // Set the `id` attribute
          hasUpdated = true; // Mark that we modified the document
        }
        return { id: heading.id, text: heading.textContent };
      });

      setHeadings(headingsArray);

      // Only update state if there was a change to avoid infinite loops
      if (hasUpdated) {
        setArticleData((prevData) => ({
          ...prevData,
          long_description: doc.body.innerHTML, // Updated HTML with IDs
        }));
      }
    }
  }, [articleData?.long_description]); // Depend only on `articleData.long_description`

  const handleScrollTo = (id) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const formatDateRelative = (dateString) => {
    const date = moment(dateString, "YYYYMMDD");
    const now = moment();
    const diffInMonths = now.diff(date, "months");
    const diffInYears = now.diff(date, "years");

    if (diffInYears >= 1) {
      return `${diffInYears} ${diffInYears > 1 ? "years" : "year"} ago`;
    }

    if (diffInMonths >= 1) {
      return `${diffInMonths} ${diffInMonths > 1 ? "months" : "month"} ago`;
    }

    return date.fromNow(); // Default relative time
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="rounded-b-[15px] rounded-t-none relative w-full h-80 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center">
        <div className="text-center w-full mt-5">
          <Header />
          <div className="my-8">
            <h1 className="text-4xl font-bold">{articleData?.title || "Article Title"}</h1>
            <p className="text-sm text-gray-200 mt-2">Published on: {formatDateRelative(articleData?.createdAt) || "N/A"}</p>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-[-50px] relative mb-8">
        {loading && (
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        )}

        {error && <div className="text-red-600 text-center py-4 bg-red-100 rounded-lg">{error}</div>}

        {articleData && (
          <>
            <nav className="flex max-w-3xl mx-auto justify-center" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <a href={`/help`} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    All Collections
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <a href={`/help/collection/${articleData?.category?.parent_category?.slug_name}`} className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                      {articleData?.category?.parent_category?.title}
                    </a>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <a href={`/help/collection/${articleData?.category?.slug_name}`} className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                      {articleData?.category?.title}
                    </a>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{articleData?.title}</span>
                  </div>
                </li>
              </ol>
            </nav>

            {headings.length > 0 && (
              <div className="mb-4 mt-4 p-3 bg-gray-100 rounded-md shadow-sm">
                <p className="font-semibold mb-2">Contents</p>
                <ul className="list-disc pl-4">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <button onClick={() => handleScrollTo(h.id)} className="text-blue-600 hover:underline">
                        {h.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div ref={contentRef} className="prose prose-lg text-gray-700 leading-relaxed mt-6" dangerouslySetInnerHTML={{ __html: articleData?.long_description }} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ArticlePageComponent;

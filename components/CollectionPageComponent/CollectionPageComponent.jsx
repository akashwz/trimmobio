"use client";

import API from "@/api";
import Footer from "@/components/lending/Footer";
import Header from "@/components/lending/Header";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CollectionPageComponent = ({ params }) => {
  const unwrappedParams = React.use(params);
  const slug = unwrappedParams?.slug;
  const [categoriesData, setCategoriesData] = useState(null);
  const [articleData, setArticleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const categoriesRes = await API({ url: `help-category/${slug}`, method: "get" });
        const articlesRes = await API({ url: `articles/category/${slug}`, method: "get" });

        if (isMounted) {
          setCategoriesData(categoriesRes?.data?.data);
          setArticleData(articlesRes?.data?.data);
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

  if (loading) return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  const defaultSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-patch-question" viewBox="0 0 16 16">
  <path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.7 1.7 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745"/>
  <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z"/>
  <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0"/>
</svg>`;

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <header className="rounded-[15px] relative w-full h-80 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center">
          <div className="text-center w-full mt-5">
            <Header />
            <h1 className="text-4xl font-bold my-8">{categoriesData?.title}</h1>
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

          {categoriesData && (
            <>
              <nav className="flex max-w-3xl mx-auto justify-center" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                  <li className="inline-flex items-center">
                    <a href={`/help`} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                      All Collections
                    </a>
                  </li>
                  <li className="inline-flex items-center">
                    <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <a href={`/help/collection/${categoriesData?.slug_name}`} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                      {categoriesData?.title}
                    </a>
                  </li>
                  {categoriesData?.sub_category?.length === 1 && (
                    <li aria-current="page">
                      <div className="flex items-center">
                        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{categoriesData?.sub_category[0]?.title}</span>
                      </div>
                    </li>
                  )}
                </ol>
              </nav>

              <div className="max-w-3xl mx-auto p-6 ">
                {categoriesData?.icon ? (
                  <div className="bg-purple-100 p-3 rounded-lg w-12">
                    <div dangerouslySetInnerHTML={{ __html: categoriesData?.icon }} />
                  </div>
                ) : (
                  <div className="bg-purple-100 p-3 rounded-lg w-12">
                    <div dangerouslySetInnerHTML={{ __html: defaultSvg }} />
                  </div>
                )}
                <h1 className="text-2xl font-bold text-gray-800">{categoriesData?.sub_category?.length === 1 ? categoriesData?.sub_category[0]?.title : categoriesData?.title}</h1>
                <p className="text-gray-600 mt-2">{categoriesData?.sub_category?.length === 1 ? categoriesData?.sub_category[0]?.description : categoriesData?.description}</p>
                <p className="text-gray-600 mt-2">{categoriesData?.articles} articles</p>
              </div>
              <div className="max-w-3xl mx-auto pb-10">
                {categoriesData?.sub_category?.length > 1
                  ? categoriesData?.sub_category?.map(
                      (category) =>
                        category?.articles?.length > 0 && (
                          <div className="bg-white shadow-md rounded-lg border p-6 mt-4" key={category?._id}>
                            {/* <h3 className="text-lg font-semibold text-gray-800">{category?.title}</h3> */}
                            <a href={`/help/collection/${category?.slug_name}`} class="ms-1 text-lg font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                              {category?.title}
                            </a>

                            <ul className="mt-2 space-y-3">
                              {category?.articles?.map((article) => (
                                <Link href={`/help/articles/${article?.slug_name}`} key={article?._id} className="flex p-3 rounded-lg justify-between items-center text-gray-700 hover:text-[#9333ea] cursor-pointer hover:bg-[#f3e8ff]">
                                  {article?.title}
                                  <span className="text-gray-700 hover:text-[#9333ea]">&gt;</span>
                                </Link>
                              ))}
                            </ul>
                          </div>
                        ),
                    )
                  : articleData?.map((article) => (
                      <Link href={`/help/articles/${article?.slug_name}`} key={article?._id} className="flex p-3 rounded-lg justify-between items-center text-gray-700 hover:text-[#9333ea] cursor-pointer hover:bg-[#f3e8ff]">
                        {article?.title}
                        <span className="text-gray-700 hover:text-[#9333ea]">&gt;</span>
                      </Link>
                    ))}
              </div>
            </>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CollectionPageComponent;

"use client";

import API from "@/api";
import Footer from "@/components/lending/Footer";
import Header from "@/components/lending/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Search } from "react-bootstrap-icons";

const HelpCenter = () => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchValue) {
        fetchCategories(searchValue);
      }
    }, 2000);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchValue]);

  const fetchCategories = async (query) => {
    setLoading(true);
    try {
      const response = await API({ url: `articles`, params: { search: query }, method: "get" });
      const data = await response;
      setArticle(data?.data?.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleArticleClick = (value) => {
    router.push(`help/articles/${value}`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API({ url: `help-category`, method: "get" });
        const data = await response;
        setCategories(data?.data?.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchArticles = async () => {
      try {
        const response = await API({
          url: `articles`,
          method: "get",
          params: { page: 1, limit: 5 },
        });
        const data = await response;
        setArticles(data?.data?.data?.records);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchCategories();
    fetchArticles();
  }, []);

  const defaultSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-patch-question" viewBox="0 0 16 16">
  <path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.7 1.7 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745"/>
  <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z"/>
  <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0"/>
</svg>`;

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <header className="rounded-[15px] relative w-full h-80 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center flex-col gap-4">
          <Header />
          <div className="text-center w-full mt-5">
            <h1 className="text-4xl font-bold">How can we help you?</h1>
          </div>
          <div className="relative w-full max-w-lg mx-auto group mb-8">
            <Search
              width={20}
              height={20}
              color="#ffffff"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="Search for articles..."
              value={searchValue}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50 group-focus:text-white peer"
            />
            {loading && <p className="text-white">Loading...</p>}

            {article?.length > 0 && searchValue && (
              <ul className="absolute w-full flex flex-col mt-2 bg-white text-black rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {article.map((category, index) => (
                  <>
                    <li
                      key={index}
                      className="px-4 py-2 w-full flex flex-col hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        handleArticleClick(category?.slug_name);
                      }}
                    >
                      {category?.title}
                      <p className="mt-1 text-gray-500 text-sm font-light">
                        {category?.short_description}
                      </p>
                    </li>
                  </>
                ))}
              </ul>
            )}
          </div>
        </header>

        <main className="mb-8 flex-1 w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-[-50px] relative">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 cursor-pointer">
              {categories?.map((category, index) => (
                <Link
                  href={`help/collection/${category?.slug_name}`}
                  key={index}
                  className="bg-white shadow-md rounded-lg p-5 border border-gray-200"
                >
                  <div className="flex items-start gap-3 flex-col">
                    {category?.icon ? (
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <div dangerouslySetInnerHTML={{ __html: category?.icon }} />
                      </div>
                    ) : (
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <div dangerouslySetInnerHTML={{ __html: defaultSvg }} />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">{category?.title}</h3>
                      <p className="text-gray-600 text-sm">{category?.description}</p>
                      <p className="text-sm text-gray-500 mt-2">{category?.articles} articles</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 pb-10">
            <div className="bg-white shadow-md border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900">Popular articles</h2>
              <ul className="mt-4 space-y-3">
                {articles?.map((article, index) => (
                  <Link
                    href={`help/articles/${article?.slug_name}`}
                    key={index}
                    className="flex p-3 rounded-lg justify-between items-center text-gray-700 hover:text-[#9333ea] cursor-pointer mt-4 hover:bg-[#f3e8ff]"
                  >
                    {article?.title}
                    <span className="text-gray-700 hover:text-[#9333ea]">&gt;</span>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HelpCenter;

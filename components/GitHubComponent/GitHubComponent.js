import API from "@/api";
import { useState } from "react";

const GitHubComponent = ({ setAddDefaultApp, widgetData }) => {
  const editData = widgetData?.thumbnail ? JSON.parse(widgetData.thumbnail) : null;

  const [username, setUsername] = useState(editData?.username || "");
  const [loading, setLoading] = useState(false);
  const [gitHubData, setGitHubData] = useState([]);
  const [gitProfileData, setGitProfileData] = useState(editData || null);

  const [selectedRepos, setSelectedRepos] = useState(Array.isArray(editData) ? editData : []);
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setGitHubData([]);
    setGitProfileData(null);
  };

  const fetchData = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    try {
      const endpoint =
        activeTab === "repositories"
          ? `/app/github/repos?username=${username}`
          : `/app/github/profile?username=${username}`;

      const response = await API({
        url: endpoint,
        method: "get",
      });

      if (response?.data?.code === 200) {
        if (activeTab === "repositories") {
          setGitHubData(response?.data?.data);
        } else {
          setGitProfileData(response?.data?.data);
          setAddDefaultApp({ thumbnail: JSON.stringify(response?.data?.data) });
        }
      } else {
        setGitHubData([]);
        setGitProfileData(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setGitHubData([]);
      setGitProfileData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (repo) => {
    let updatedSelection = [...selectedRepos];

    if (updatedSelection.some((r) => r.id === repo.id)) {
      updatedSelection = updatedSelection.filter((r) => r.id !== repo.id);
    } else {
      updatedSelection.push({
        id: repo.id,
        html_url: repo.html_url,
        name: repo.name,
      });
    }

    setSelectedRepos(updatedSelection);
    setAddDefaultApp({ thumbnail: JSON.stringify(updatedSelection) });
  };

  return (
    <div className="bg-white border rounded-lg px-4 py-2 mx-auto my-4 w-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">GitHub Data Fetcher</h2>

      <div className="flex bg-gray-500 rounded-full p-1 justify-between">
        <button
          className={`px-6 w-full py-2 rounded-full font-bold transition-all duration-300 ${
            activeTab === "profile" ? "bg-white text-black shadow" : "text-white"
          }`}
          onClick={() => handleTabClick("profile")}
        >
          Profile
        </button>
        <button
          className={`px-6 w-full py-2 rounded-full font-bold transition-all duration-300 ${
            activeTab === "repositories" ? "bg-white text-black shadow" : "text-white"
          }`}
          onClick={() => handleTabClick("repositories")}
        >
          Repositories
        </button>
      </div>

      <form onSubmit={fetchData}>
        <div className="flex justify-center items-center gap-2 my-4">
          <input
            type="text"
            placeholder="Enter GitHub Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-transparent rounded-full border border-black focus:border-black focus:bg-white focus:ring-0 text-sm outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out peer"
          />
          <button
            type="submit"
            className="bg-green-400 hover:bg-[#ebff57] hover:text-[#000] text-white font-medium py-2 px-8 rounded-full shadow-md transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-400 disabled:hover:text-white"
          >
            Submit
          </button>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : (
        <>
          {activeTab === "profile" && gitProfileData && (
            <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 text-center">
              <img
                src={gitProfileData?.avatar_url}
                alt="GitHub Avatar"
                width={80}
                height={80}
                className="rounded-full mx-auto mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-900">
                {gitProfileData?.name || "No Name Available"}
              </h3>
              <p className="text-sm text-gray-700">{gitProfileData?.location || "Location N/A"}</p>
              <a
                href={gitProfileData?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block bg-gray-200 w-[50%] p-2 text-center rounded-lg text-black hover:bg-gray-300 transition-all duration-200 border-2 border-gray-300"
              >
                Follow
              </a>
            </div>
          )}

          {activeTab === "repositories" && gitHubData.length > 0 && (
            <div className="max-h-[400px] overflow-y-auto border border-gray-200 rounded-lg p-4">
              {gitHubData.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCheckboxChange(item)}
                  className={`p-4 border cursor-pointer transition-transform transform hover:scale-95 duration-200 flex justify-between items-center ${
                    selectedRepos.some((r) => r.id === item.id)
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <h3 className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-github"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                    </svg>{" "}
                    &nbsp;{item.name}
                  </h3>
                  <input
                    type="checkbox"
                    checked={selectedRepos.some((r) => r.id === item.id)}
                    onChange={() => handleCheckboxChange(item)}
                    onClick={(e) => e.stopPropagation()}
                    className="accent-green-500"
                  />
                </div>
              ))}
            </div>
          )}

          {!gitHubData.length && activeTab === "repositories" && (
            <p className="text-center text-gray-500">No repositories found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default GitHubComponent;

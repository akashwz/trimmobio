import ToastNotification from "@/controller/ToastNotification";
import { Tooltip } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "react-bootstrap-icons";

export const InstagramGrid = ({
  thumbnailString,
  handleButtonClick,
  bioData,
  changeAppearanceData,
  item,
}) => {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateCols = () => {
        if (window.innerWidth < 640) setCols(2);
        else setCols(3);
      };

      updateCols();
      window.addEventListener("resize", updateCols);
      return () => window.removeEventListener("resize", updateCols);
    }
  }, []);
  if (!thumbnailString) return <p className="text-center p-1 m-2">No Post available</p>;

  const thumbnails = thumbnailString?.split(",")?.map((url) => url?.trim());
  const total = thumbnails?.length;

  return (
    <div
      className={` text-left h-full flex flex-col items-center cursor-pointer`}
      onClick={() => handleButtonClick(item?.url, bioData?._id, item?._id)}
    >
      <div className="w-full p-2">
        <div className="flex flex-row items-center space-x-2 p-2 justify-center sm:justify-center ">
          <Image
            src="https://cdn.trimmo.bio/trimmo_bio/instagram.svg"
            height={24}
            width={24}
            alt="instagram-logo"
            className="sm:h-8 sm:w-8"
          />
          <span className={`w-full block text-${changeAppearanceData?.button_text_align}`}>
            {item?.url ? item?.url?.split("instagram.com/")[1].replace("/", "") : "UserName"}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-4 rounded-lg">
          {thumbnails?.map((url, index) => {
            const isFirstInRow = index % cols === 0;
            const isLastInRow = index % cols === cols - 1 || index === total - 1;
            const isFirstRow = index < cols;
            const isLastRow = index >= total - cols;

            return (
              <div
                key={index}
                className={`overflow-hidden shadow-lg border border-gray-300
              ${isFirstInRow ? "border-l" : ""}
              ${isLastInRow ? "border-r" : ""}
              ${isFirstRow ? "border-t" : ""}
              ${isLastRow ? "border-b" : ""}
              ${index === 0 ? "rounded-tl-lg" : ""}
              ${index === cols - 1 ? "rounded-tr-lg" : ""}
              ${index === total - cols ? "rounded-bl-lg" : ""}
              ${index === total - 1 ? "rounded-br-lg" : ""}
            `}
              >
                <img
                  src={url}
                  alt={`Instagram Thumbnail ${index + 1}`}
                  className="w-full h-32 sm:h-24 object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
      {item?.description && (
        <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>{item?.description}</span>
      )}
    </div>
  );
};

export const ConvertYouTubeURL = (url) => {
  if (!url) return "";
  let videoId = "";

  if (url.includes("watch?v=")) {
    videoId = new URL(url).searchParams.get("v");
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("/embed/")) {
    return url;
  }

  return `https://www.youtube.com/embed/${videoId}`;
};

export const CalendlyController = ({ isPopupOpen, item }) => {
  useEffect(() => {
    if (item?.app_name !== "calendly" || !item?.url) return;

    const existingScript = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]',
    );

    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (typeof window !== "undefined") {
        setTimeout(() => {
          if (window.Calendly && typeof window.Calendly.initInlineWidgets === "function") {
            window.Calendly.initInlineWidgets();
          } else {
            console.error("Calendly.initInlineWidgets is still unavailable after script reload");
          }
        }, 1000);
      }
    };

    return () => {
      script.remove();
    };
  }, [item?.app_name, isPopupOpen, item?.url]);

  return item?.url ? (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div
        className="calendly-inline-widget w-full"
        data-url={item.url}
        style={{ height: "calc(62vh - 100px)", overflow: "hidden" }}
      />
      {item?.description && (
        <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>{item?.description}</span>
      )}
    </div>
  ) : (
    <p>Invalid Calendly URL</p>
  );
};

export const MusicController = ({ buttonClass, buttonStyle, item }) => {
  return (
    <div
      className={`${buttonClass} text-left h-full flex flex-col items-center p-4 bg-white shadow-lg rounded-lg border border-gray-200`}
      style={buttonStyle}
      // onMouseEnter={() => handleMouseEnter(item?._id)}
      // onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center w-full space-x-3">
        {/* <img
          src="https://cdn-icons-png.flaticon.com/512/727/727245.png" // Music Icon
          alt="Music Icon"
          className="w-10 h-10"
        /> */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{item?.name || "Music Player"}</h3>
          <p className="text-sm text-gray-500">Tap to Play</p>
        </div>
      </div>
      <audio controls className="w-full mt-3">
        <source src={item?.url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {item?.description && (
        <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>{item?.description}</span>
      )}
    </div>
  );
};

export const GalleryController = ({ buttonClass, buttonStyle, item }) => {
  return (
    <div
    // className={`${buttonClass} text-left h-full flex flex-col items-center cursor-pointer`}
    // style={buttonStyle}
    // onMouseEnter={() => handleMouseEnter(item?._id)}
    // onMouseLeave={handleMouseLeave}
    // onClick={() => handleButtonClick(item?.url, bioData?._id, item?._id)}
    >
      <div className="w-full p-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-4 rounded-lg">
          {Array.isArray(item?.url.split(",")) && (
            <>
              {item?.url.split(",").map((url, index) => {
                return (
                  <div key={index}>
                    <img
                      src={url}
                      alt={`Instagram Thumbnail ${index + 1}`}
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      {item?.description && (
        <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>{item?.description}</span>
      )}
    </div>
  );
};

export const SeparatorController = ({ item }) => {
  const urlSettings = item?.content ? JSON.parse(item?.content) : {};
  const { lineWidth, lineHeight, lineType, lineColor } = urlSettings;

  return (
    <div className={`mt-2 py-2 h-full w-full items-center flex justify-center cursor-pointer`}>
      <hr
        style={{
          width: `${lineWidth}%`,
          height: `${lineHeight}px`,
          borderTop: `${lineHeight}px ${lineType} ${lineColor}`,
        }}
      />
      {item?.description && (
        <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>{item?.description}</span>
      )}
    </div>
  );
};

export const PollsController = ({ buttonClass, buttonStyle, item, bioData, activeTabPreview }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(null);
  const [pollData, setPollData] = useState(null);
  const [votes, setVotes] = useState({});
  const userIp = useRef(bioData?.ip);

  useEffect(() => {
    if (!item?.content) return;

    try {
      const parsedData = JSON.parse(item?.content);
      if (!parsedData.question?.trim() || !parsedData.options?.length) {
        setError("Poll data is incomplete: Missing question or options.");
        setPollData(null);
        return;
      }

      setPollData(parsedData);
      setError(null);
    } catch {
      setError("Error parsing poll data.");
      setPollData(null);
    }
  }, [item?.content]);

  const storedVotes = useMemo(() => {
    try {
      return JSON.parse(item?.thumbnail || "{}");
    } catch {
      return {};
    }
  }, [item?.thumbnail]);

  useEffect(() => {
    setVotes(storedVotes);

    for (const [option, ips] of Object.entries(storedVotes)) {
      if (ips.includes(userIp.current)) {
        setSelectedOption(option);
        break;
      }
    }
  }, [storedVotes]);

  const handleOptionChange = async (option) => {
    if (!userIp.current) {
      ToastNotification.error("Unable to retrieve your IP. Please try again.");
      return;
    }

    setSelectedOption(option);

    setVotes((prevVotes) => {
      const updatedVotes = { ...prevVotes };

      // Remove user IP from all options
      Object.keys(updatedVotes).forEach((key) => {
        updatedVotes[key] = updatedVotes[key].filter((ip) => ip !== userIp.current);
      });

      // Add user IP to selected option
      updatedVotes[option] = [...(updatedVotes[option] || []), userIp.current];

      localStorage.setItem(`poll_${item?.id}_votes`, JSON.stringify(updatedVotes));
      updatePollVotes(updatedVotes);

      return updatedVotes;
    });
  };

  const updatePollVotes = async (updatedVotes) => {
    try {
      const payload = {
        user_id: bioData?._id,
        thumbnail: JSON.stringify(updatedVotes),
        type: activeTabPreview === "Links" ? "link" : "shop",
      };

      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}bio/guest/${item?._id}`, payload);
    } catch (error) {
      console.error("Error updating poll", error);
    }
  };

  const totalVoteUser = Object.values(votes).reduce((total, current) => {
    if (Array.isArray(current)) {
      return total + current.length;
    }
    return total;
  }, 0);

  const clearPoll = () => {
    setSelectedOption(null);
  };

  return (
    <div
      // className={`${buttonClass} h-full w-full flex flex-col items-start justify-start p-4 bg-white border border-gray-200`}
      // style={buttonStyle}
      className="w-full"
    >
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* <h3 className="text-lg font-semibold mb-2">{item?.name}</h3> */}
          <p className="text-gray-700 mb-4">{pollData?.question}</p>

          <form className="grid grid-cols-1 gap-4 w-full">
            {pollData?.options?.map((option, index) => (
              <label
                key={index}
                className="flex items-center space-x-2 cursor-pointer bg-gray-100 p-2 rounded-lg shadow-md hover:bg-gray-200 transition w-full"
              >
                <input
                  type="radio"
                  name="poll"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                  className="form-radio cursor-pointer peer"
                  style={{
                    accentColor: buttonStyle?.color,
                  }}
                />
                <span className="text-left">
                  {option}{" "}
                  {selectedOption && (
                    <>
                      {" "}
                      (
                      {(votes[option]?.length * 100) / totalVoteUser === 0
                        ? 0
                        : ((votes[option]?.length * 100) / totalVoteUser).toFixed(2)}
                      %)
                    </>
                  )}
                </span>
              </label>
            ))}
          </form>
          {selectedOption && (
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition"
              onClick={clearPoll}
            >
              Clear Poll
            </button>
          )}

          {selectedOption && (
            <p className="mt-2 text-green-600 font-semibold">Selected: {selectedOption}</p>
          )}
        </>
      )}
      {item?.description && (
        <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>{item?.description}</span>
      )}
    </div>
  );
};

export const TrustpilotReviewController = ({ buttonClass, buttonStyle, item }) => {
  const [error, setError] = useState(null);

  let contentData = null;
  try {
    contentData = JSON.parse(item?.thumbnail);
  } catch (err) {
    setError("Error parsing review data");
  }
  return (
    <div
      className={`${buttonClass} flex h-full flex-col items-center p-4 bg-white shadow-lg rounded-lg border border-gray-200 w-full`}
      style={buttonStyle}
    >
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-2">{contentData?.companyName}</h2>
          {contentData?.companyLogo && (
            <img
              src={contentData?.companyLogo}
              alt={`${contentData?.companyName} Logo`}
              className="w-24 h-24 object-contain mb-3"
            />
          )}

          <div className="flex flex-col items-center">
            {contentData?.trustScoreImage && (
              <img
                src={contentData?.trustScoreImage}
                alt="Trust Score"
                className="w-24 h-5 object-contain mb-2"
              />
            )}
            <p className="text-gray-700 text-sm">{contentData?.reviewsSummary}</p>
            <p className="text-gray-900 font-semibold">Rating: {contentData?.rating} ⭐</p>
          </div>

          {item?.url && (
            <Link
              href={item?.url}
              target="_blank"
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Write a review
            </Link>
          )}
        </>
      )}
      {item?.description && (
        <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>{item?.description}</span>
      )}
    </div>
  );
};

export const SpotifyController = ({ buttonClass, buttonStyle, item }) => {
  const [error, setError] = useState(null);

  const getSpotifyEmbedUrl = (url) => {
    if (!url) return null;

    const match = url.match(/(?:spotify\.com\/)(track|playlist|album)\/([a-zA-Z0-9]+)/);
    if (match) {
      return `https://open.spotify.com/embed/${match[1]}/${match[2]}`;
    }
    return null;
  };

  const spotifyEmbedUrl = getSpotifyEmbedUrl(item?.url);

  return (
    <div
      className={`${buttonClass} flex h-full flex-col items-center px-4 py-4 bg-white shadow-lg rounded-lg border border-gray-200 w-full mx-auto`}
      style={buttonStyle}
    >
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : spotifyEmbedUrl ? (
        <>
          <iframe
            src={spotifyEmbedUrl}
            width="100%"
            height="152"
            allow="encrypted-media"
            className="rounded-lg"
          ></iframe>
          {item?.description && (
            <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>
              {item?.description}
            </span>
          )}
        </>
      ) : (
        <p className="text-gray-500">Invalid Spotify URL</p>
      )}
    </div>
  );
};

export const VimeoController = ({ item }) => {
  const [error, setError] = useState(null);

  // Function to extract the Vimeo video ID and generate an embed URL
  const getVimeoEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}` : null;
  };

  const vimeoEmbedUrl = getVimeoEmbedUrl(item?.url);

  return (
    <div className={`flex flex-col justify-center items-center h-full w-full`}>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : vimeoEmbedUrl ? (
        <>
          <iframe
            src={vimeoEmbedUrl}
            width="100%"
            height="100%"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
          {item?.description && (
            <span className={`block text-sm ${item?.logo && "ml-0"}`}>{item?.description}</span>
          )}
        </>
      ) : (
        <p className="text-gray-500">Invalid Vimeo URL</p>
      )}
    </div>
  );
};

export const DownloadController = ({ item }) => {
  const [error, setError] = useState(null);
  let fileData = null;

  if (item?.content) {
    try {
      fileData = JSON.parse(item?.content);
    } catch (err) {
      console.error("Invalid JSON in item.url:", err);
      setError("Invalid file data format.");
    }
  } else {
    setError("No file data available.");
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : fileData ? (
        <div className="w-full bg-white shadow-lg rounded-xl p-5 border border-gray-200">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">
              {fileData?.file_name || "Unnamed File"}
            </p>

            {fileData?.file_description ? (
              <p className="text-sm text-gray-500 whitespace-pre-line">
                {fileData?.file_description}
              </p>
            ) : (
              <p className="text-sm text-gray-400 italic">No description available.</p>
            )}

            <p className="text-sm text-gray-500">Size: {fileData?.file_size || "Unknown"}</p>
          </div>

          {fileData?.file_link ? (
            <div className="mt-4 flex justify-center">
              <Link
                href={fileData?.file_link}
                target="_blank"
                className="px-5 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition"
              >
                Download
              </Link>
            </div>
          ) : (
            <p className="text-gray-500 mt-3">File link is missing.</p>
          )}
          {item?.description && (
            <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>
              {item?.description}
            </span>
          )}
        </div>
      ) : (
        <p className="text-gray-500">No valid file available.</p>
      )}
    </div>
  );
};

export const ThreadsController = ({ item }) => {
  const [error, setError] = useState(null);
  const [threadData, setThreadData] = useState(null);

  useEffect(() => {
    if (!item) {
      setError("No thread data available.");
      return;
    }

    try {
      setThreadData(item);
    } catch (err) {
      console.error("Invalid Data: ", err);
      setError("Invalid thread data format.");
    }
  }, [item]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!threadData) {
    return <p className="text-gray-500">No valid thread available.</p>;
  }

  let thumbnailData = null;
  try {
    thumbnailData = threadData?.thumbnail ? JSON.parse(threadData?.thumbnail) : null;
  } catch (err) {
    console.error("Error parsing thumbnail data: ", err);
    setError("Invalid thumbnail data format.");
  }

  return (
    <div className="flex flex-col justify-center items-center px-4 space-y-6">
      {thumbnailData && (
        <div className="grid w-full">
          <Link
            href={threadData?.url || "#"}
            target="_blank"
            className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 flex flex-col items-center cursor-pointer"
          >
            <div className="relative w-full h-auto">
              <img
                src={thumbnailData?.media_url}
                alt="Thread Thumbnail"
                className="rounded-lg object-cover"
              />
            </div>
            <p className="text-sm text-gray-500 mt-4">{thumbnailData?.text}</p>
          </Link>
        </div>
      )}
      {item?.description && (
        <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>{item?.description}</span>
      )}
    </div>
  );
};

export const RichTextController = ({ item }) => {
  if (!item?.content) {
    return (
      <div className="flex justify-center items-center px-4 py-6 text-red-500 font-semibold">
        Error: No content available.
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center px-4 space-y-6">
      <div className="prose" dangerouslySetInnerHTML={{ __html: item.content }} />
      {item?.description && (
        <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>{item?.description}</span>
      )}
    </div>
  );
};

export const FaceBookController = ({ item }) => {
  if (!item?.thumbnail) {
    return (
      <div className="flex justify-center items-center px-4 py-6 text-red-500 font-semibold">
        Error: No thumbnail data available.
      </div>
    );
  }

  let thumbnailData;
  try {
    thumbnailData = JSON.parse(item?.thumbnail);
  } catch (error) {
    console.error("Error parsing thumbnail JSON:", error);
    return (
      <div className="flex justify-center items-center px-4 py-6 text-red-500 font-semibold">
        Error: Invalid thumbnail data.
      </div>
    );
  }

  return (
    <div className="max-w-sm w-full bg-white rounded-2xl contents shadow-lg overflow-hidden border border-gray-200">
      <div className="flex justify-center bg-gray-100 p-4">
        <img
          src={thumbnailData?.picture?.data?.url}
          alt={thumbnailData?.name || "Facebook Thumbnail"}
          className="w-20 h-20 rounded-full border-2 border-gray-300 shadow-sm"
        />
      </div>

      <div className="p-5 text-center">
        <h2 className="text-xl font-semibold text-gray-800">{thumbnailData?.name || "No Name"}</h2>
        {thumbnailData?.about && (
          <p className="text-gray-600 text-sm mt-2">{thumbnailData?.about}</p>
        )}
        <div className="flex flex-col gap-2 mt-4 w-full">
          {thumbnailData?.website && (
            <Link
              href={thumbnailData?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-2 text-sm text-white bg-blue-600 rounded-lg text-center hover:bg-blue-700 transition"
            >
              Visit Website
            </Link>
          )}
          {thumbnailData?.link && (
            <Link
              href={thumbnailData?.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-2 text-sm text-white bg-gray-700 rounded-lg text-center hover:bg-gray-800 transition"
            >
              Facebook Page
            </Link>
          )}
        </div>
      </div>
      {item?.description && (
        <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>{item?.description}</span>
      )}
    </div>
  );
};

export const SoundCloudController = ({ item }) => {
  const [embedUrl, setEmbedUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!item?.url) {
      setError("No SoundCloud URL provided.");
      return;
    }

    // Construct the SoundCloud embed URL
    const soundCloudEmbedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
      item?.url,
    )}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`;

    setEmbedUrl(soundCloudEmbedUrl);
  }, [item?.url]);

  return (
    <div
      className={`mt-2 flex flex-col items-center p-4 bg-white shadow-lg rounded-lg border border-gray-200 w-full mx-auto`}
    >
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : embedUrl ? (
        <>
          <iframe
            width="100%"
            height="166"
            allow="autoplay"
            src={embedUrl}
            className="rounded-lg"
          ></iframe>
          {item?.description && (
            <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>
              {item?.description}
            </span>
          )}
        </>
      ) : (
        <p className="text-gray-500">Loading SoundCloud player...</p>
      )}
    </div>
  );
};

export const GitHubController = ({ item, buttonClass, buttonStyle }) => {
  const repos = item?.thumbnail ? JSON.parse(item?.thumbnail) : [];

  return (
    <div
    // className={`${buttonClass} h-full w-full flex flex-col items-start justify-start p-4 bg-white border border-gray-200`}
    // style={buttonStyle}
    >
      <>
        {repos?.length > 0 ? (
          <div className="w-full">
            {repos?.map((repo, index) => (
              <Link
                key={index}
                href={repo?.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-gray-100 hover:bg-gray-200 transition p-3 rounded-md mb-2 font-medium text-sm md:text-base truncate"
              >
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
                &nbsp;
                {repo?.name}
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 text-center">
            <img
              src={repos?.avatar_url}
              alt="GitHub Avatar"
              width={80}
              height={80}
              className="rounded-full mx-auto mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-900">
              {repos?.name || "No Name Available"}
            </h3>
            <p className="text-sm text-gray-700">{repos?.username}</p>
            <p className="text-sm text-gray-700">{repos?.location || "Location N/A"}</p>
            <p className="text-sm text-gray-700">
              Public Repos: <strong>{repos?.public_repos}</strong>
            </p>
            <p className="text-sm text-gray-700">
              Followers: <strong>{repos?.followers}</strong> | Following:{" "}
              <strong>{repos?.following}</strong>
            </p>
            <a
              href={repos.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block bg-gray-200 w-[50%] p-2 text-center rounded-lg text-black hover:bg-gray-300 transition-all duration-200 border-2 border-gray-300"
            >
              Follow
            </a>
          </div>
        )}
        {item?.description && (
          <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>{item?.description}</span>
        )}
      </>
    </div>
  );
};

export const PintrestController = ({ item }) => {
  const repos = item?.thumbnail ? JSON.parse(item?.thumbnail) : [];

  return (
    <div className="mt-2 flex flex-col items-center p-4 bg-white shadow-lg rounded-lg border border-gray-200 w-full mx-auto">
      <h4 className="text-xl font-bold text-gray-800 mb-5 text-center">Pinterest Gallery</h4>

      {repos?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
          {repos?.map((repo, index) => (
            <Link key={index} href={repo?.url} target="_blank" rel="noopener noreferrer">
              <div className="relative w-full h-full  rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform">
                <img
                  src={repo?.image}
                  alt={`Pinterest Item ${index + 1}`}
                  className="rounded-lg object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No Pinterest items available.</p>
      )}
      {item?.description && (
        <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>{item?.description}</span>
      )}
    </div>
  );
};

export const RedditController = ({ item }) => {
  const thumbnail = item?.thumbnail ? JSON.parse(item?.thumbnail) : null;
  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-md rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="p-4">
        {thumbnail ? (
          <>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 text-center break-words">
              {thumbnail?.title}
            </h2>
            <Link href={thumbnail?.url} target="_blank">
              <div className="w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                {thumbnail?.is_video ? (
                  <video
                    src={thumbnail?.post}
                    controls
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <img
                    src={thumbnail?.post}
                    alt={thumbnail?.title}
                    className="w-full h-full object-contain rounded-lg"
                  />
                )}
              </div>
            </Link>
          </>
        ) : (
          <p className="text-center text-gray-500">No thumbnail available</p>
        )}
      </div>
      {item?.description && (
        <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>{item?.description}</span>
      )}
    </div>
  );
};

export const DiscountController = ({ item, changeAppearanceData }) => {
  let thumbnail = null;
  try {
    thumbnail = item?.thumbnail ? JSON.parse(item?.thumbnail) : null;
  } catch (error) {
    console.error("Invalid thumbnail JSON:", error);
  }

  const couponCode = thumbnail?.couponCode || null;
  const couponName = thumbnail?.couponName || null;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (couponCode) {
      navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!couponCode || !couponName) {
    return (
      <div className="flex justify-center items-center">
        <div className="bg-gray-200 text-gray-700 text-center py-6 px-4 md:py-10 md:px-8 rounded-lg shadow-md w-full">
          <h3 className="text-lg md:text-2xl font-semibold mb-3">No Discount Available</h3>
          <p className="text-sm md:text-base">Please check back later for new offers.</p>
        </div>
        {item?.description && (
          <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>{item?.description}</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-center py-6 px-4 md:py-10 md:px-8 rounded-lg shadow-md relative w-full">
        <h3 className="text-lg md:text-2xl font-semibold mb-3">{couponName}</h3>
        <div className="flex items-center justify-center gap-x-2 mb-4">
          <div
            onClick={handleCopy}
            className="flex items-center border border-dashed text-white px-3 py-2 md:px-4 md:py-2.5 rounded text-sm md:text-base cursor-pointer"
          >
            <span id="cpnCode" className="flex items-center gap-2">
              {couponCode}
              <Tooltip title={copied ? "Copied" : "Copy"}>
                <button
                  id="cpnBtn"
                  onClick={handleCopy}
                  className="flex items-center gap-2 border border-white bg-white text-purple-600 px-2 py-1 md:px-3 md:py-2 rounded cursor-pointer transition hover:bg-gray-100"
                >
                  {copied ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="bi bi-check-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="bi bi-clipboard-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zm-5 0A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A1.5 1.5 0 0 1 5 2.5zm-2 0h1v1A2.5 2.5 0 0 0 6.5 5h3A2.5.5 0 0 0 12 2.5v-1h1a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2"
                      />
                    </svg>
                  )}
                </button>
              </Tooltip>
            </span>
          </div>
        </div>

        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-5 md:-ml-6"
          style={{ backgroundColor: changeAppearanceData?.basicColor }}
        />
        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-5 md:-mr-6"
          style={{ backgroundColor: changeAppearanceData?.basicColor }}
        />

        {item?.description && (
          <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>{item?.description}</span>
        )}
      </div>
    </div>
  );
};

export const MobileAppController = ({ item }) => {
  const [apkList, setApkList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (item?.thumbnail) {
        const parsedData = JSON.parse(item?.thumbnail);
        setApkList(parsedData);
      }
    } catch (err) {
      setError("Failed to parse APK data.");
      console.error("Parsing error:", err);
    } finally {
      setLoading(false);
    }
  }, [item]);

  if (loading) {
    return <p className="text-gray-500 text-center mt-4">Loading APKs...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  return (
    <div className="bg-white border rounded-xl shadow-lg p-6 mx-auto w-full max-w-2xl flex flex-col items-center justify-center gap-4">
      {apkList?.selectedImage?.group === "group1" ? (
        <>
          {apkList?.appstore_link && (
            <a href={apkList?.appstore_link} target="_blank" rel="noopener noreferrer">
              <img
                src="/images/app-store-dark-button.svg"
                alt="App Store"
                className="w-48 h-auto cursor-pointer"
              />
            </a>
          )}
          {apkList?.playstore_link && (
            <a href={apkList?.playstore_link} target="_blank" rel="noopener noreferrer">
              <img
                src="/images/play-store-dark-button.svg"
                alt="App Store"
                className="w-48 h-auto cursor-pointer"
              />
            </a>
          )}
        </>
      ) : (
        <>
          {apkList?.appstore_link && (
            <a href={apkList?.appstore_link} target="_blank" rel="noopener noreferrer">
              <img
                src="/images/app-store-light-button.svg"
                alt="App Store"
                className="w-48 h-auto cursor-pointer"
              />
            </a>
          )}
          {apkList?.playstore_link && (
            <a href={apkList?.playstore_link} target="_blank" rel="noopener noreferrer">
              <img
                src="/images/play-store-light-button.svg"
                alt="App Store"
                className="w-48 h-auto cursor-pointer"
              />
            </a>
          )}
        </>
      )}
      {item?.description && (
        <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>{item?.description}</span>
      )}
    </div>
  );
};

export const FaqController = ({ item, buttonClass, buttonStyle }) => {
  const [faqList, setFaqList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    try {
      if (item?.thumbnail) {
        const parsedData = JSON.parse(item?.thumbnail);
        if (Array.isArray(parsedData)) {
          setFaqList(parsedData);
        } else {
          setError("Invalid FAQ data format.");
        }
      }
    } catch (err) {
      setError("Failed to parse FAQ data.");
      console.error("Parsing error:", err);
    } finally {
      setLoading(false);
    }
  }, [item]);

  const toggleFaq = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (loading) {
    return <p className="text-gray-500 text-center mt-4">Loading FAQs...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (faqList?.length === 0) {
    return <p className="text-gray-500 text-center mt-4">No FAQs available.</p>;
  }

  return (
    <div
      // className={`${buttonClass
      //   .replace(/\b(h-\[?\d+[a-z]*\]?|flex)\b/g, "")
      //   .trim()} bg-white border p-4 border-gray-200 shadow-lg mx-auto my-6 w-full`}
      // style={buttonStyle}
      className="w-full"
    >
      {/* <h3 className="text-lg font-semibold mb-4">{item?.name}</h3> */}
      <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {faqList?.map((faq, index) => (
          <details
            key={index}
            className="bg-gray-100 border rounded-lg mb-2 p-4"
            open={expandedIndex === index}
          >
            <summary
              className="flex justify-between items-center cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                toggleFaq(index);
              }}
            >
              <span className="font-medium text-gray-900 truncate w-[85%] md:w-[90%]">
                {faq?.faq_question}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  expandedIndex === index ? "rotate-180" : ""
                }`}
              />
            </summary>

            <div className="mt-3 border-t pt-3 text-gray-700 max-h-40 overflow-y-auto">
              <p>{faq?.faq_ans}</p>
            </div>
          </details>
        ))}
      </div>
      {item?.description && (
        <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>{item?.description}</span>
      )}
    </div>
  );
};

export const TopmateController = ({ item }) => {
  let thumbnailData = null;
  try {
    thumbnailData = item?.thumbnail ? JSON.parse(item?.thumbnail) : null;
  } catch (err) {
    console.error("Parsing error:", err);
  }

  if (!thumbnailData) {
    return (
      <div className="bg-white rounded-lg border p-4 border-gray-200 shadow-lg mx-auto my-6 w-full max-w-lg text-center">
        <p className="text-red-500 font-semibold">Error: No valid data found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border p-4 border-gray-200 shadow-lg mx-auto my-6 w-full max-w-lg text-center">
      <div className="flex flex-col items-center">
        <img
          src={thumbnailData?.profile}
          alt={thumbnailData?.name}
          className="w-32 h-32 rounded-full object-cover border shadow-sm"
        />
        <h4 className="text-md font-medium mt-3">{thumbnailData?.name}</h4>
        <p className="text-gray-600 text-sm mt-1 px-4">{thumbnailData?.description}</p>
      </div>
      <Link
        href={item?.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Visit Profile
      </Link>
      {item?.description && (
        <span className={`block mt-2 text-sm ${item?.logo && "ml-0"}`}>{item?.description}</span>
      )}
    </div>
  );
};

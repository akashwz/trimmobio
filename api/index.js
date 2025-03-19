import { decryptData, encryptData } from "@/utils/encryptionUtils";
import instance from "./apiInstance";

// Create a function to make API calls using the instance
const API = async (config = { url: "", method: "", headers: {}, params: {}, data: {} }) => {
  try {
    if (config?.data) {
      config.data = config.url.includes("/bio/fileupload") ? config.data : encryptData(config.data);
    }
    const response = await instance({
      url: config.url,
      method: config.method,
      headers: {
        ...config.headers,
        "Content-Type": config.url.includes("/bio/fileupload")
          ? "multipart/form-data"
          : "application/json",
      },
      params: config.params,
      data: config.data,
    });
    let responseData =
      process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD"
        ? { data: decryptData(response.data.encrypted), status: response.status }
        : response;
    return responseData;
  } catch (error) {
    const errorLog =
      process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD"
        ? decryptData(error?.response?.data?.encrypted)
        : error?.response;
    return Promise.reject(errorLog?.data?.error ?? error?.data?.message);
  }
};

export default API;

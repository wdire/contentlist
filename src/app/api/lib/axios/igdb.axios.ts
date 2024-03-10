import axios from "axios";
import {getTwitchAccessToken} from "../utils/igdb.util.api";

const igdbAxios = axios.create({
  baseURL: "https://api.igdb.com/v4",
  headers: {
    "Client-ID": process.env.TWITCH_CLIENT_ID,
  },
});

igdbAxios.interceptors.request.use(async (config) => {
  try {
    const accessToken = await getTwitchAccessToken();
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  } catch (error) {
    console.error("Error fetching Twitch access token:", error);
    throw error;
  }
});

export default igdbAxios;

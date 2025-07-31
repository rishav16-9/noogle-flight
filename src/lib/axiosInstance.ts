import { BASE_API_URL } from "@/constants";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
    "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
  },
});

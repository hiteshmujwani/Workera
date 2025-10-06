import { BASE_URL } from "@/constant/constant";
import axios from "axios";

export const Api = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  withCredentials: true,
});

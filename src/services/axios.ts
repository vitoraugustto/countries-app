import axios, { AxiosInstance } from "axios";
import { REST_COUNTRIES_BASE_URL } from "../config/api";

export const instance: AxiosInstance = axios.create({
  baseURL: REST_COUNTRIES_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

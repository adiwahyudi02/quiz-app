import axios from "axios";

export const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVICES_URL,
});

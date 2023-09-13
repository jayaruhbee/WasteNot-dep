import axios from "axios";

// Added api route to test cookies
export const api = axios.create({
  baseURL: "https://api.wastenot.info/api/",
  withCredentials: true,
});

export default api;

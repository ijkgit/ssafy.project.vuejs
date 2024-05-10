import axios from "axios";

const { VITE_MAP_API_URL } = import.meta.env;

function Axios(url) {
  if (url === "map") url = VITE_MAP_API_URL;
  const instance = axios.create({
    baseURL: url,
    header: {
      "Content-Type": "Application/json;charset=utf-8",
    },
  });
  return instance;
}

export { Axios };

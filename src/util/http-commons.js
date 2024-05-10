import axios from "axios";

const { VITE_BASE_URL, VITE_MAP_API_URL,VITE_BOARD_API_URL } = import.meta.env;

function Axios(url) {
  if (url === "map") url = VITE_MAP_API_URL;
  else if (url === "board") url = VITE_BOARD_API_URL;
  else url="";

  const instance = axios.create({
    baseURL: VITE_BASE_URL + url,
    header: {
      "Content-Type": "Application/json;charset=utf-8",
    },
  });
  return instance;
}

export { Axios };

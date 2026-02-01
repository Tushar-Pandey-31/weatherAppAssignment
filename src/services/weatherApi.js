import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Current weather
export const getCurrentWeather = async (city, unit = "metric") => {
  if (!city) throw new Error("City is required");

  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      units: unit,
      appid: API_KEY,
    },
  });

  return response.data;
};

export const getForecast = async (city, unit = "metric") => {
  if (!city) throw new Error("City is required");

  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      units: unit,
      appid: API_KEY,
    },
  });

  return response.data;
};

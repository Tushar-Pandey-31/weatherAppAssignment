import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentWeather, getForecast } from "../services/weatherApi";

export const getWeatherByCity = createAsyncThunk(
  "weather/getWeatherByCity",
  async ({ city, units }) => {
    const data = await getCurrentWeather(city, units);
    return { city, data };
  }
);
export const getForecastByCity = createAsyncThunk(
  "weather/getForecastByCity",
  async ({ city, units }) => {
    const data = await getForecast(city, units);
    return { city, data };
  }
);


const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    cities: {},
    forecast: {},
    status: "idle",
    lastUpdated: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherByCity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWeatherByCity.fulfilled, (state, action) => {
        state.cities[action.payload.city] = action.payload.data;
        state.status = "success";
        state.lastUpdated = Date.now();
      })
      .addCase(getWeatherByCity.rejected, (state) => {
        state.status = "error";
      })
      // forecast
      .addCase(getForecastByCity.fulfilled, (state, action) => {
        state.forecast[action.payload.city] = action.payload.data;
      });
  },
});

export default weatherSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCurrentWeather } from "../services/openWeatherApi";

export const getWeatherByCity = createAsyncThunk(
  "weather/getWeatherByCity",
  async ({ city, units }) => {
    const res = await fetchCurrentWeather(city, units);
    return { city, data: res.data };
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    cities: {},
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
      });
  },
});

export default weatherSlice.reducer;

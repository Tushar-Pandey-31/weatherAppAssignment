import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentWeather, getForecast } from "../services/weatherApi";

export const getWeatherByCity = createAsyncThunk(
  "weather/getWeatherByCity",
  async ({ city, units }, { getState, rejectWithValue }) => {
    const state = getState();
    const existingCity = state.weather.cities[city];
    const lastUpdated = state.weather.lastUpdated?.[city];
    // Check what unit is currently stored for this city
    const lastUnit = state.weather.units?.[city];
    
    // Only skip if: 
    // 1. Data exists 
    // 2. It's less than 60s old 
    // 3. AND the unit being requested is the SAME as the one already stored
    if (
      existingCity && 
      lastUpdated && 
      (Date.now() - lastUpdated < 60000) &&
      units === lastUnit
    ) {
       return rejectWithValue("CACHED");
    }

    const data = await getCurrentWeather(city, units);
    return { city, data, units, timestamp: Date.now() };
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
    units: {}, // New state to track unit per city
    status: "idle",
    lastUpdated: {}, // Initialize as object to match your usage
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherByCity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWeatherByCity.fulfilled, (state, action) => {
        const { city, data, units, timestamp } = action.payload;
        state.cities[city] = data;
        state.units[city] = units; // Store the unit used
        state.lastUpdated[city] = timestamp;
        state.status = "success";
      })
      .addCase(getWeatherByCity.rejected, (state, action) => {
        // Only set error status if it wasn't a manual cache abort
        if (action.payload !== "CACHED") {
            state.status = "error";
        } else {
            state.status = "success";
        }
      })
      .addCase(getForecastByCity.fulfilled, (state, action) => {
        state.forecast[action.payload.city] = action.payload.data;
      });
  },
});

export default weatherSlice.reducer;
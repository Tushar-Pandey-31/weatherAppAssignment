import { createSlice } from "@reduxjs/toolkit";
import { loadFavorites, saveFavorites } from "../utils/localStorage"; // adjust path as needed

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    cities: loadFavorites(),
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const city = action.payload;
      if (state.cities.includes(city)) {
        state.cities = state.cities.filter((c) => c !== city);
      } else {
        state.cities.push(city);
      }
      saveFavorites(state.cities);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
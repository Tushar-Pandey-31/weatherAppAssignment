import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherByCity } from "../app/weatherSlice";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.settings.unit);
  const cities = useSelector((state) => state.weather.cities);

  const handleSearch = () => {
    if (!query) return;
    if (cities[query]) return;
    dispatch(getWeatherByCity({ city: query, units: unit }));
    setQuery("");
  };

  return (
    <div>
      <input
        placeholder="Search city"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

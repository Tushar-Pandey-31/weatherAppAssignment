import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherByCity } from "../app/weatherSlice";
import { searchCities } from "../services/weatherApi";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.settings.unit);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 2) {
        const results = await searchCities(query);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelect = (city) => {
    dispatch(getWeatherByCity({ city: city.name, units: unit }));
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="search-container" style={{ position: "relative" }}>
      <input
        className="search-input"
        placeholder="Search city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((s, i) => (
            <li key={i} onClick={() => handleSelect(s)}>
              {s.name}, {s.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
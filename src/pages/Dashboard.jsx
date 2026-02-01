import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherByCity } from "../app/weatherSlice";
import CityCard from "../components/CityCard";
import SearchBar from "../components/SearchBar";
import UnitToggle from "../components/UnitToggle";

const DEFAULT_CITIES = ["Delhi", "Mumbai", "London"];

export default function Dashboard() {
  const dispatch = useDispatch();
  const { cities, status } = useSelector((state) => state.weather);
  const favorites = useSelector((state) => state.favorites.cities);
  const unit = useSelector((state) => state.settings.unit);

  useEffect(() => {
    const refreshData = () => {
      // Loop through currently displayed cities and refresh them
      Object.keys(cities).forEach((city) => {
        dispatch(getWeatherByCity({ city, units: unit }));
      });
    };

    const interval = setInterval(refreshData, 60000); // Trigger every 60s
    return () => clearInterval(interval); 
  }, [dispatch, unit, cities]);

  useEffect(() => {
    const citiesToFetch = [...new Set([...DEFAULT_CITIES, ...favorites])];

    citiesToFetch.forEach((city) => {
      dispatch(getWeatherByCity({ city, units: unit }));
    });
} , [dispatch, unit, favorites.length]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Weather Dashboard</h1>
        
        <div className="controls-section">
          <SearchBar />
          <UnitToggle />
        </div>
      </div>

      {status === "loading" && <p>Loading data...</p>}

      <div className="cities-grid">
        {Object.keys(cities).map((city) => (
          <CityCard key={city} city={city} data={cities[city]} />
        ))}
      </div>
    </div>
  );
}
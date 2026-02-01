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


  const sortedCities = [
  ...favorites,
  ...Object.keys(cities).filter((c) => !favorites.includes(c)),
  ];

  useEffect(() => {
    DEFAULT_CITIES.forEach((city) => {
      dispatch(getWeatherByCity({ city, units: unit }));
    });
  }, [dispatch, unit]);

  console.log("Cities state:", cities);


  return (
    <div>
      <h1>Weather Dashboard</h1>

      <SearchBar />
      <UnitToggle />

      {status === "loading" && <p>Loading...</p>}

      <div style={{ display: "flex", gap: "16px" }}>
        {Object.keys(cities).map((city) => (
          <CityCard key={city} city={city} data={cities[city]} />
        ))}
      </div>
    </div>
  );
}

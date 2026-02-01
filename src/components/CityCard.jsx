import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toggleFavorite } from "../app/favoritesSlice";


export default function CityCard({ city, data }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.cities);
  const isFavorite = favorites.includes(city);
  if (!data) return null;

  return (
    <Link to={`/city/${city}`} style={{ textDecoration: "none" }}>
        <button
            onClick={(e) => {
            e.preventDefault();
            dispatch(toggleFavorite(city));
        }}
        >
    {isFavorite ? "⭐" : "☆"}
    </button>

      <div style={{
        border: "1px solid #ddd",
        padding: "16px",
        borderRadius: "8px",
        width: "180px"
      }}>
        <h3>{city}</h3>
        <p>{Math.round(data.main.temp)}°</p>
        <p>{data.weather[0].main}</p>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="weather"
        />
      </div>
    </Link>
  );
}




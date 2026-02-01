import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../app/favoritesSlice";

export default function CityCard({ city, data }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.cities);
  const isFavorite = favorites.includes(city);
  
  if (!data) return null;

  return (
    <div className="city-card-wrapper" style={{ position: 'relative' }}>
        {/* We move the button outside the Link or handle click propogation carefully. 
            However, putting a button inside an anchor (Link) is invalid HTML. 
            Better to wrap the card content in the Link, but keep the button separate 
            visually via absolute positioning, or use e.preventDefault (which you did).
        */}
        
        <Link to={`/city/${city}`} className="city-card">
            <button
                className="fav-btn"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); // Good practice to stop bubbling
                    dispatch(toggleFavorite(city));
                }}
            >
                {isFavorite ? "⭐" : "☆"}
            </button>

            <h3 className="city-name">{city}</h3>
            <img
                className="weather-icon"
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].main}
            />
            <p className="city-temp">{Math.round(data.main.temp)}°</p>
            <p className="city-weather">{data.weather[0].main}</p>
        </Link>
    </div>
  );
}
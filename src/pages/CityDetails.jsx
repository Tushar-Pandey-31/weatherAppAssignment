import { useParams } from "react-router-dom";
import { getForecastByCity } from "../app/weatherSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherByCity } from "../app/weatherSlice";
import WeatherChart from "../components/WeatherChart";


export default function CityDetails() {
  const dispatch = useDispatch();
  const { city } = useParams();
  const weatherData = useSelector((state) => state.weather.cities[city]);
  useEffect(() => {
    dispatch(getWeatherByCity({ city, units: "metric" }));
    dispatch(getForecastByCity({ city, units: "metric" }));
  }, [city]);

  const unit = useSelector((state) => state.settings.unit);

  useEffect(() => {
    dispatch(getWeatherByCity({ city, units: unit }));
    dispatch(getForecastByCity({ city, units: unit }));
  }, [city, unit]);


  const forecast = useSelector(
    (state) => state.weather.forecast[city]
  );
  
  const chartData =
  forecast?.list?.slice(0, 8).map((item) => ({
    time: item.dt_txt.split(" ")[1].slice(0, 5),
    temp: Math.round(item.main.temp),
  })) || [];



  if (!weatherData) {
    return <p>Loading city weather...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{city}</h1>

      <h2>{Math.round(weatherData.main.temp)}°</h2>
      <p>{weatherData.weather[0].description}</p>

      <div style={{ marginTop: "16px" }}>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>Pressure: {weatherData.main.pressure} hPa</p>
        <p>Wind: {weatherData.wind.speed} m/s</p>
      </div>
      
      {chartData.length > 0 && (
      <>
        <h3>Temperature Trend</h3>
        <WeatherChart data={chartData} />
      </>
)}
    </div>
  );
}

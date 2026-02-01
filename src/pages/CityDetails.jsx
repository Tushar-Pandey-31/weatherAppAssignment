import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherByCity, getForecastByCity } from "../app/weatherSlice";
import WeatherChart from "../components/WeatherChart";

export default function CityDetails() {
  const dispatch = useDispatch();
  const { city } = useParams();
  const [viewMode, setViewMode] = useState("hourly"); // 'hourly' | 'daily'
  
  const weatherData = useSelector((state) => state.weather.cities[city]);
  const forecastData = useSelector((state) => state.weather.forecast[city]);
  const unit = useSelector((state) => state.settings.unit);

  useEffect(() => {
    if (!weatherData) dispatch(getWeatherByCity({ city, units: unit }));
    if (!forecastData) dispatch(getForecastByCity({ city, units: unit }));
  }, [city, unit, dispatch]); // Added missing dependencies

  const hourlyData = useMemo(() => {
    return forecastData?.list?.slice(0, 8).map((item) => ({
      time: item.dt_txt.split(" ")[1].slice(0, 5), // "12:00"
      temp: Math.round(item.main.temp),
    })) || [];
  }, [forecastData]);

  // 2. Daily Data 
  const dailyData = useMemo(() => {
    if (!forecastData?.list) return [];
    
    const dailyMap = {};

    forecastData.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0]; // "2023-10-25"
      
      if (!dailyMap[date]) {
        dailyMap[date] = {
            min: item.main.temp,
            max: item.main.temp,
            sum: 0,
            count: 0,
            icon: item.weather[0].icon
        };
      }
      
      // Update min/max
      dailyMap[date].min = Math.min(dailyMap[date].min, item.main.temp);
      dailyMap[date].max = Math.max(dailyMap[date].max, item.main.temp);
      dailyMap[date].sum += item.main.temp;
      dailyMap[date].count += 1;
    });

    // Convert map to array
    return Object.keys(dailyMap).map((date) => {
        const d = new Date(date);
        return {
            time: d.toLocaleDateString("en-US", { weekday: 'short' }), // "Mon", "Tue"
            temp: Math.round(dailyMap[date].sum / dailyMap[date].count), // Average temp
            min: Math.round(dailyMap[date].min),
            max: Math.round(dailyMap[date].max)
        };
    }).slice(0, 5); 
  }, [forecastData]);

  const chartData = viewMode === "hourly" ? hourlyData : dailyData;

  if (!weatherData) return <div className="loading">Loading city weather...</div>;

  return (
    <div className="dashboard-container">
      <Link to="/" className="back-link">← Back to Dashboard</Link>
      
      <div className="city-header" style={{ marginTop: '1rem' }}>
        <h1 style={{ margin: 0 }}>{city}</h1>
        <p className="city-weather-desc">{weatherData.weather[0].description}</p>
      </div>

      <div className="weather-summary-card">
         <div className="main-stat">
            <span className="big-temp">{Math.round(weatherData.main.temp)}°</span>
            <img 
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                alt="icon" 
            />
         </div>
         <div className="grid-stats">
            <div className="stat-item">
                <span>Humidity</span>
                <strong>{weatherData.main.humidity}%</strong>
            </div>
            <div className="stat-item">
                <span>Pressure</span>
                <strong>{weatherData.main.pressure} hPa</strong>
            </div>
            <div className="stat-item">
                <span>Wind</span>
                <strong>{weatherData.wind.speed} m/s</strong>
            </div>
         </div>
      </div>

      <div className="chart-section" style={{ marginTop: '2rem' }}>
        <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Forecast</h3>
            <div className="toggle-container">
                <button 
                    className={`toggle-btn ${viewMode === 'hourly' ? 'active' : ''}`}
                    onClick={() => setViewMode('hourly')}
                >
                    Hourly
                </button>
                <button 
                    className={`toggle-btn ${viewMode === 'daily' ? 'active' : ''}`}
                    onClick={() => setViewMode('daily')}
                >
                    5-Day
                </button>
            </div>
        </div>
        
        {/* Pass the data to your existing chart component */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: 'var(--shadow)' }}>
            <WeatherChart data={chartData} />
        </div>
      </div>
    </div>
  );
}
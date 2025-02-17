import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style/WeatherWidget.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "3bfa17da9fc44514ba243314251302";
  const CITY = "Rohtak";

  useEffect(() => {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY}&days=5`) 
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error.message);
          setLoading(false);
          return;
        }
        setWeather(data.current);
        setForecast(data.forecast.forecastday);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch weather data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white text-center p-5">Loading...</div>;
  if (error) return <div className="text-danger text-center p-5">{error}</div>;

  return (
    <div
      className="weather-container d-flex align-items-center justify-content-center min-vh-100 text-white p-4"
      style={{ backgroundImage: "url('/background.png')", backgroundSize: "cover" }}
    >
      <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4 w-100">
      
        <div className="text-center text-md-start w-50">
          <h1 className="fw-bold display-6">
            Real-Time & Historical World Weather Data API
          </h1>
          <p className="mt-3 text-light fs-5">
            Retrieve instant, accurate weather information for any location in the world in lightweight JSON format.
          </p>

          <div className="trusted d-flex justify-content-center justify-content-md-start mt-4">
            <div className="trust d-flex align-items-center p-3">
              <i className="bi bi-trophy-fill fs-4 me-2"></i>
              <p className="m-0 text-light fs-5 fw-bold">
                Trusted by 75,000 companies worldwide
              </p>
            </div>
          </div>

          <button className="btn btn-warning mt-3 fw-semibold px-4 py-2 shadow-lg">
            Start Using the API
          </button>
        </div>

        <div className="weather-widget bg-dark text-white p-4 rounded shadow-lg">
          <h2 className="fs-5 text-uppercase fw-semibold">
            {CITY}, {weather?.condition?.text}
          </h2>
          <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="image-container">
              <div className="animated-img"></div>
            </div>
            <span className="fs-1 fw-bold ms-3">{Math.round(weather?.temp_c)}°C</span>
          </div>
          <p className="mt-2 fs-6 fw-medium">Wind: {weather?.wind_kph} km/h</p>
          <p>Pressure: {weather?.pressure_mb} mb</p>

          <div className="forecast-container mt-4 d-flex justify-content-between">
            {forecast.map((day, index) => (
              <div key={index} className="text-center">
                <p className="fw-semibold">
                  {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                </p>
                <img src={day.day.condition.icon} alt={day.day.condition.text} />
                <p>{Math.round(day.day.maxtemp_c)}°C</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;

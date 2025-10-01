import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Weather() {
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleFetchWeather = async () => {
    if (!district) {
      setError('Please enter a district.');
      return;
    }

    const location = `${district}${state ? `, ${state}` : ''}, India`;
    const apiKey = '1c5428c52dd34dc89f8170204252609';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setError(data.error.message);
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setError('');
      }
    } catch (err) {
      setError('Failed to fetch weather data.');
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>🌤️ Weather Advisory</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>State:</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter state (optional)"
            />
          </div>
          <div className="form-group">
            <label>District:</label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="Enter district"
            />
          </div>
        </div>
        <motion.button
          onClick={handleFetchWeather}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 35px rgba(67,160,71,0.35)" }}
          whileTap={{ scale: 0.95 }}
        >
          Get Weather
        </motion.button>

        {error && <p className="error">{error}</p>}

        {weatherData && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="weather-info"
          >
            <h3>{weatherData.location.name}, {weatherData.location.region}</h3>
            <p>🌡️ Temperature: <strong>{weatherData.current.temp_c}°C</strong></p>
            <p>☁️ Condition: <strong>{weatherData.current.condition.text}</strong></p>
            <p>💧 Humidity: <strong>{weatherData.current.humidity}%</strong></p>
            <p>💨 Wind Speed: <strong>{weatherData.current.wind_kph} km/h</strong></p>
            <p>🌧️ Rainfall: <strong>{weatherData.current.precip_mm} mm</strong></p>
          </motion.div>
        )}
      </motion.div>

      <style>{`
        .weather-container {
          max-width: 650px;
          margin: 50px auto;
          padding: 35px 30px;
          background: linear-gradient(135deg, #ffffff, #e8f5e9);
          border-radius: 25px;
          box-shadow: 0 15px 45px rgba(0,0,0,0.12);
          font-family: 'Arial', sans-serif;
          text-align: center;
          transition: all 0.3s ease;
        }
        h2 {
          color: #2e7d32;
          font-size: 34px;
          font-weight: 700;
          margin-bottom: 30px;
          background: linear-gradient(90deg, #43a047, #81c784);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .form-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 25px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        label {
          font-weight: 600;
          margin-bottom: 6px;
          color: #1b5e20;
        }
        input {
          width: 100%;
          padding: 14px 12px;
          border-radius: 12px;
          border: 1.5px solid #a5d6a7;
          font-size: 16px;
          outline: none;
          transition: all 0.3s ease;
        }
        input:focus {
          border: 2px solid #43a047;
          box-shadow: 0 0 12px rgba(67,160,71,0.35);
        }
        button {
          width: 100%;
          padding: 16px;
          background: linear-gradient(90deg, #43a047, #66bb6a);
          color: white;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-size: 16px;
          box-shadow: 0 6px 25px rgba(0,0,0,0.18);
          transition: all 0.3s ease;
        }
        .error {
          color: #d32f2f;
          font-weight: 600;
          margin-top: 15px;
        }
        .weather-info {
          margin-top: 30px;
          padding: 25px;
          background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
          border-radius: 20px;
          box-shadow: 0 10px 35px rgba(0,0,0,0.15);
          text-align: left;
          font-size: 16px;
          transition: all 0.3s ease;
        }
        .weather-info h3 {
          margin-bottom: 12px;
          color: #1b5e20;
          font-size: 22px;
        }
        .weather-info p {
          margin: 8px 0;
          font-weight: 500;
          color: #2e7d32;
        }
      `}</style>
    </div>
  );
}

export default Weather;

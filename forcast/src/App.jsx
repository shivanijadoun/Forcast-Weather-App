import React, { useEffect, useState } from 'react';
import './App.css';
import TopButtons from './Components/TopButtons';
import Inputs from './Components/Inputs'
import TimeAndLocation from './Components/TimeAndLocation';
import TemperatureAndDetails from './Components/TemperatureAndDetails';
import Forcast from './Components/Forcast';
import getFormattedWeatherData from "./Services/WeatherService";

const App = () => {
  const [query, setQuery] = useState({ q: "delhi" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    try {
      const data = await getFormattedWeatherData({ q: query.q, units });
      console.log("Fetched Weather Data:", data);
      setWeather(data);
      setError(null); 
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("City not found");
      } else {
        setError("Invalid City name");
      }
      setWeather(null); 
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () =>{
    if (!weather) return "from-cyan-600 to-blue-700";

  const currentHour = new Date().getHours();
  const threshold = units === "metric" ? 20 : 60;

  // Time-based theme setting
  let timeOfDay = '';
  if (currentHour >= 5 && currentHour < 12) {
    timeOfDay = 'morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    timeOfDay = 'afternoon';
  } else if (currentHour >= 18 && currentHour < 21) {
    timeOfDay = 'evening';
  } else {
    timeOfDay = 'night';
  }

  // Weather condition handling (you can expand based on your API response)
  const weatherCondition = weather.details.toLowerCase(); // Assuming `weather.details` contains something like "Clear" or "Clouds"

  if (weather.temp <= threshold) {
    if (weatherCondition.includes('clear')) {
      return `from-cyan-600 to-blue-700 ${timeOfDay}-clear`;
    } else if (weatherCondition.includes('clouds')) {
      return `from-gray-400 to-gray-600 ${timeOfDay}-cloudy`;
    } else if (weatherCondition.includes('rain')) {
      return `from-blue-800 to-gray-900 ${timeOfDay}-rainy`;
    }
  } else {
    if (weatherCondition.includes('clear')) {
      return `from-yellow-400 to-orange-600 ${timeOfDay}-clear`;
    } else if (weatherCondition.includes('clouds')) {
      return `from-yellow-200 to-gray-400 ${timeOfDay}-cloudy`;
    } else if (weatherCondition.includes('rain')) {
      return `from-blue-600 to-gray-800 ${timeOfDay}-rainy`;
    }
  }

  return "from-cyan-600 to-blue-700"; // Default fallback color
  }

 
  if (!weather && !error) {
    return <div>Loading...</div>;
  }


  return (
    <div className={`mx-auto max-w-screen-md mt-2 py-2 px-6  bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />
      {error && <div className="text-red-500">{error}</div>} 
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <Forcast title="Hourly Forecast" data={weather.hourly} />
          <Forcast title="Daily Forecast" data={weather.daily} />
        </>
      )}
    </div>
  );
}

export default App;

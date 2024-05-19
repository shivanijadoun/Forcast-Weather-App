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
      setError(null); // Reset error state if successful
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("City not found");
      } else {
        setError("An error occurred while fetching weather data");
      }
      setWeather(null); // Reset weather state on error
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () =>{
    if(!weather) return "from cyan-600 to-blue-700";
    const threshold = units === "metric"?20:60;
    if(weather.temp <= threshold) return "from-cyan-600 to-blue-700"
    return "from-yellow to-orange-700"
  }

  // Render loading indicator if weather data is not yet fetched
  if (!weather && !error) {
    return <div>Loading...</div>;
  }

  // Once weather data is fetched, render the rest of the components
  return (
    <div className={`mx-auto max-w-screen-md mt-2 py-2 px-16  bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      {/* Pass setQuery as a prop to TopButtons */}
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />
      {error && <div className="text-red-500">{error}</div>} {/* Render error message if there's an error */}
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

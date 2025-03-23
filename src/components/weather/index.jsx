import React, { useEffect, useState } from "react";
import Search from "../search";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apikey = import.meta.env.VITE_API_KEY;

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null); // Reset error state
   try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError("Please enter another city name");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!search)
      return alert("Please enter a city name to get the weather details");
    fetchWeatherData(search);
  };

  useEffect(() => {
    fetchWeatherData("Bareilly");
  }, []);

  const getCurrentDate = () => {
    const date = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <p className="text-4xl font-bold">loading...</p>
      ) : error ? (
        <p className="text-4xl font-bold text-red-500">{error}</p>
      ) : (
        <div>
          <div className="mb-2.5">
            <h2>
              {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
            </h2>
          </div>
          <div className="text-lg font-medium italic text-gray-700">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="text-[64px] text-black font-bold text-center">
            {Math.floor(weatherData?.main?.temp - 273.15)}&#176;C
            <p className="weather-decs text-black text-[22px] mb-5">
              {weatherData &&
                weatherData?.weather[0] &&
                weatherData?.weather[0].description}
            </p>
            <div className="info flex justify-evenly items-center mt-5 py-0 px-5 text-[18px] font-bold text-center">
              <div className="flex items-center leading-5">
                <div>
                  <p className="wind">{weatherData?.wind?.speed} m/s</p>
                  <p className="text-2xl font-medium">Wind Speed</p>
                </div>
              </div>
              <div className="flex items-center leading-5">
                <div>
                  <p className="humidity">{weatherData?.main?.humidity}%</p>
                  <p className="text-2xl font-medium">Humidity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;

import { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import SearchHistory from "./components/SearchHistory";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import {
  getWeather,
  getWeatherByLocation,
  getForecast
} from "./services/weatherApi";
import { MdMyLocation } from "react-icons/md";
import ForecastCard from "./components/ForecastCard";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [forecast, setForecast] = useState([]);

  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("weatherHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Save Search History
  const saveHistory = (cityName) => {
    const updatedHistory = [
      cityName,
      ...history.filter((item) => item !== cityName),
    ].slice(0, 5);

    setHistory(updatedHistory);

    localStorage.setItem(
      "weatherHistory",
      JSON.stringify(updatedHistory)
    );
  };

  // Fetch Weather
  const fetchWeather = async (cityName = city) => {
    if (!cityName.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getWeather(cityName);

      if (data.cod !== 200) {
        setError("City not found. Please check the spelling.");
        setWeather(null);
      } else {
        setWeather(data);
        const forecastData = await getForecast(data.name);

setForecast(forecastData.list.filter((item, index) => index % 8 === 0));
        saveHistory(data.name);
        setCity("");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // location-based weather fetching
    const handleCurrentLocation = () => {
  if (!navigator.geolocation) {
    setError("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        setLoading(true);
        setError("");

        const { latitude, longitude } = position.coords;

        const data = await getWeatherByLocation(latitude, longitude);

        if (data.cod !== 200) {
          setError("Unable to fetch weather.");
          setWeather(null);
        } else {
          setWeather(data);
          saveHistory(data.name);
          setCity("");
        }
      } catch (error) {
        setError("Unable to fetch current location weather.");
      } finally {
        setLoading(false);
      }
    },
    () => {
      setError("Location permission denied.");
    }
  );
};

  // Recent Search Click
  const selectCity = (cityName) => {
    fetchWeather(cityName);
  };

  // Enter Key Search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-700 flex items-center justify-center p-4">

        <div className="w-full max-w-lg rounded-3xl bg-white/20 backdrop-blur-xl border border-white/20 shadow-2xl p-6">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">

            <div>
              <h1 className="text-4xl font-bold text-white">
                Weather App
              </h1>

              <p className="text-white/80 text-sm mt-1">
                Search weather anywhere in the world
              </p>
            </div>

            {/* Dark Mode (Coming Soon) */}
            <button
              className="bg-white/20 hover:bg-white/30 rounded-xl px-4 py-3 transition"
              title="Coming Soon"
            >
              🌙
            </button>

          </div>

          {/* Search */}
          <SearchBar
            city={city}
            setCity={setCity}
            fetchWeather={fetchWeather}
            handleKeyPress={handleKeyPress}
            loading={loading}
          />

          <button
  onClick={handleCurrentLocation}
  className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
>
  <MdMyLocation size={22} />
  Use Current Location
</button>

          {/* Loading */}
          {loading && <Loading />}

          {/* Empty State */}
          {!loading && !weather && !error && (
            <div className="text-center text-white mt-10">

              <div className="text-7xl">
                🌤️
              </div>

              <h2 className="text-2xl font-semibold mt-4">
                Welcome
              </h2>

              <p className="text-white/80 mt-2">
                Search any city to view live weather updates.
              </p>

            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <ErrorMessage message={error} />
          )}

          {/* Weather */}
          {!loading && weather && (
            <WeatherCard weather={weather} />
              
          )}

          {/* Forecast */}
          {!loading && forecast.length > 0 && (
            <ForecastCard forecast={forecast} />
          )}

          {/* Search History */}
          <SearchHistory
            history={history}
            onSelectCity={selectCity}
          />

        </div>
      </div>
    </div>
  );
}

export default App;
import {
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiThermometer,
} from "react-icons/wi";

import { FaEye } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

function WeatherCard({ weather }) {
  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mt-6 bg-blue-50 rounded-2xl shadow-lg p-6">

      {/* City */}
      <h2 className="text-3xl font-bold text-center text-gray-800">
        <IoLocationSharp className="inline text-red-500" />{weather.name}
      </h2>

      {/* Date */}
      <p className="text-center text-gray-500 mt-1">
        {currentDate}
      </p>

      {/* Weather Icon */}
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
        alt={weather.weather[0].description}
        className="mx-auto"
      />

      {/* Weather Description */}
      <p className="text-center capitalize text-lg text-gray-600">
        {weather.weather[0].description}
      </p>

      {/* Temperature */}
      <h1 className="text-5xl font-bold text-center mt-3 text-blue-700">
        {Math.round(weather.main.temp)}°C
      </h1>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4 mt-8">

        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-gray-500"><WiHumidity className="text-4xl text-blue-500 mx-auto" /> Humidity</p>
          <h3 className="text-xl font-semibold">
            {weather.main.humidity}%
          </h3>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-gray-500"><WiStrongWind className="text-4xl text-green-500 mx-auto" /> Wind</p>
          <h3 className="text-xl font-semibold">
            {weather.wind.speed} m/s
          </h3>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-gray-500"><WiThermometer className="text-4xl text-red-500 mx-auto" /> Feels Like</p>
          <h3 className="text-xl font-semibold">
            {Math.round(weather.main.feels_like)}°C
          </h3>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-gray-500"><WiBarometer className="text-4xl text-purple-500 mx-auto" /> Pressure</p>
          <h3 className="text-xl font-semibold">
            {weather.main.pressure} hPa
          </h3>
        </div>

      </div>

      {/* Visibility */}
      <div className="mt-5 bg-white rounded-xl p-4 shadow text-center">
        <p className="text-gray-500"><FaEye className="text-2xl text-indigo-500 mx-auto" /> Visibility</p>
        <h3 className="text-xl font-semibold">
          {(weather.visibility / 1000).toFixed(1)} km
        </h3>
      </div>

    </div>
  );
}

export default WeatherCard;
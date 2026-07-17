import { getDay } from "../utils/formatDate";

function ForecastCard({ forecast }) {
  return (
    <div className="mt-8">

      <h2 className="text-xl font-bold text-white mb-4">
        5-Day Forecast
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

        {forecast.map((day) => (

          <div
            key={day.dt}
            className="
bg-white/20
backdrop-blur-lg
rounded-2xl
p-4
text-center
text-white
shadow-lg
hover:scale-105
hover:bg-white/30
transition-all
duration-300
"
          >

            <p className="font-semibold">
  {getDay(day.dt_txt)}
</p>

           <img
src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="mx-auto"
            />

            <p className="text-2xl font-bold">
              {Math.round(day.main.temp)}°C
            </p>

            <p className="capitalize text-sm">
              {day.weather[0].description}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ForecastCard;
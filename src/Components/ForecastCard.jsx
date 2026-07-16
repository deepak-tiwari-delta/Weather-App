function ForecastCard({ forecast }) {
  return (
    <div className="mt-8">

      <h2 className="text-xl font-bold text-white mb-4">
        5-Day Forecast
      </h2>

      <div className="grid grid-cols-2 gap-3">

        {forecast.map((day) => (

          <div
            key={day.dt}
            className="bg-white/20 backdrop-blur rounded-xl p-4 text-center text-white"
          >

            <p className="font-semibold">
              {new Date(day.dt_txt).toLocaleDateString("en-IN", {
                weekday: "short",
              })}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt=""
              className="mx-auto"
            />

            <p className="text-lg font-bold">
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
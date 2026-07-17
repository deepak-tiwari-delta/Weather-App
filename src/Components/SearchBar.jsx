function SearchBar({
  city,
  setCity,
  fetchWeather,
  handleKeyPress,
  loading,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        placeholder="🔍 Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyPress}
        aria-label="City Name"
        className="
          flex-1
          px-4
          py-3
          rounded-xl
          border
          border-gray-300
          outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          transition
        "
      />

      <button
        onClick={fetchWeather}
        disabled={loading}
       className="
bg-cyan-500
hover:bg-cyan-600
text-white
font-semibold
px-6
py-3
rounded-xl
transition-all
duration-300
hover:scale-105
"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}

export default SearchBar;
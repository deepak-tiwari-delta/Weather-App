function SearchHistory({
  history,
  onSelectCity,
}) {
  if (history.length === 0) return null;

  return (
    <div className="mt-5">
      <h3 className="font-semibold mb-2">
        Recent Searches
      </h3>

      <div className="flex flex-wrap gap-2">
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelectCity(item)}
            className="
bg-white
hover:bg-cyan-500
hover:text-white
transition-all
duration-300
px-4
py-2
rounded-full
shadow
"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;
function SearchBar({ value, onChange }) {
  return (
    <div className="flex items-center gap-2 rounded border border-gray-300 bg-white px-3 py-1.5">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search"
        className="w-40 text-sm outline-none"
      />
      <img src="/icons/ic_search.png" alt="" className="h-4 w-4" />
    </div>
  );
}

export default SearchBar;

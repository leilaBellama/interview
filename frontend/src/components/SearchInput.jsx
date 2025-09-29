import { SearchIcon } from "../assets/icons.jsx";

export default function SearchInput({
  searchTerm,
  onSearchChange,
  placeholder = "Search...",
  caseSensitive = false,
  onCaseSensitiveChange,
  searchBy,
  onSearchByChange,
  searchOptions = [],
}) {
  return (
    <div className="flex gap-2">
      {/* Search by dropdown */}
      {searchOptions.length > 0 && onSearchByChange && (
        <select
          value={searchBy}
          onChange={(e) => onSearchByChange(e.target.value)}
          className="py-2 px-2 input-box border rounded cursor-pointer"
          title="Search by"
        >
          {searchOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {/* Search input */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="py-2 px-3 pl-10 pr-20 input-box w-full"
        />

        {/* Search icon - left side */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-500" />
        </div>

        {/* Right side controls */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
          {/* Case sensitivity toggle */}
          {onCaseSensitiveChange && (
            <button
              onClick={() => onCaseSensitiveChange(!caseSensitive)}
              className={`text-xs font-medium px-2 py-1 rounded transition-colors duration-200 pointer-events-auto ${
                caseSensitive ? "bg-gray-300" : "bg-gray-100 text-gray-400"
              }`}
              title={caseSensitive ? "Case sensitive" : "Case insensitive"}
            >
              Aa
            </button>
          )}

          {/* Clear button */}
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 pointer-events-auto text-2xl sm:text-base"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

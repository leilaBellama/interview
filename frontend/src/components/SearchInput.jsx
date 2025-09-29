import { SearchIcon } from "../assets/icons.jsx";

export default function SearchInput({
  searchTerm,
  onSearchChange,
  placeholder = "Search...",
}) {
  return (
    <div className="">
      <div className="relative w-full">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="py-2 px-3 pl-10 pr-8 input-box w-full"
        />

        {/* Search icon - left side */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-500" />
        </div>

        {/* Clear button - right side */}
        {searchTerm && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              onClick={() => onSearchChange("")}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 pointer-events-auto text-2xl sm:text-base"
              title="Clear search"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { SortIcon } from "../assets/icons.jsx";

export default function SortDropdown({
  sortOrder,
  onSortChange,
  options,
  label,
}) {
  return (
    <div className="flex items-center space-x-1">
      {/* Sort icon */}
      <SortIcon className="" />

      {label && (
        <label
          htmlFor="sort"
          className="text-sm font-medium text-gray-700 whitespace-nowrap"
        >
          {label}
        </label>
      )}

      {/* Dropdown */}
      <select
        id="sort"
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
        style={{
          padding: "0.25rem",
          fontSize: "0.875rem",
        }}
        className="input-box"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

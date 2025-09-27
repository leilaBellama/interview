export default function SortDropdown({
  sortOrder,
  onSortChange,
  options,
  label = "Sort by:",
}) {
  return (
    <div className="flex items-center space-x-2">
      <label
        htmlFor="sort"
        className="text-sm font-medium text-gray-700 whitespace-nowrap"
      >
        {label}
      </label>
      <select
        id="sort"
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
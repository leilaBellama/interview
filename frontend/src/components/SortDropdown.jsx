import { SortIcon } from "../assets/icons.jsx";

export default function SortDropdown({ sortOrder, onSortChange, options, label }) {
  const handleToggle = () => {
    if (options.length === 2) {
      // Find the other option
      const newValue =
        sortOrder === options[0].value ? options[1].value : options[0].value;
      onSortChange(newValue);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Sort icon */}
      <SortIcon className="w-6 h-6 text-gray-600" />

      {/* Label */}
      {label && <span className="text-sm font-medium">{label}</span>}

      {/* If only 2 options → button toggle */}
      {options.length === 2 ? (
        <button
          onClick={handleToggle}
          className="input-box px-2 py-1 text-sm flex items-center gap-1"
        >
          {options.find((opt) => opt.value === sortOrder)?.label}
        </button>
      ) : (
        /* Otherwise → dropdown */
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          className="input-box px-2 py-1 text-sm"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

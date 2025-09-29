import { SortIcon } from "../assets/icons.jsx";

export default function SortDropdown({ sortOrder, onSortChange, options, label }) {
  const handleToggle = () => {
    // Find current option index
    const currentIndex = options.findIndex((opt) => opt.value === sortOrder);

    if (currentIndex !== -1) {
      // Find the "paired" option: e.g. asc <-> desc
      // If current is even, toggle to next; if odd, toggle to previous
      const isEven = currentIndex % 2 === 0;
      const pairedIndex = isEven ? currentIndex + 1 : currentIndex - 1;

      const newValue = options[pairedIndex]?.value || sortOrder;
      onSortChange(newValue);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Sort icon as toggle */}
      <button onClick={handleToggle}>
        <SortIcon className="w-6 h-6 text-black" />
      </button>

      {/* Label */}
      {label && <span className="text-sm font-medium">{label}</span>}

      {/* Dropdown (or toggle button if only 2 options) */}
      {options.length === 2 ? (
        <button
          onClick={handleToggle}
          className="input-box px-2 py-1 text-sm flex items-center gap-1"
        >
          {options.find((opt) => opt.value === sortOrder)?.label}
        </button>
      ) : (
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          className="input-box px-2 py-1 text-sm cursor-pointer"
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

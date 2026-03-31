import type { TodoFilter as FilterType } from "../types/todo";

interface TodoFilterProps {
  current: FilterType;
  onChange: (filter: FilterType) => void;
}

const filters: { value: FilterType; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "active", label: "未完了" },
  { value: "completed", label: "完了済み" },
];

export function TodoFilter({ current, onChange }: TodoFilterProps) {
  return (
    <div className="mb-4 flex gap-2">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
            current === value
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

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
    <div className="mb-4 inline-flex rounded-lg border border-gray-200 dark:border-gray-600">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={`px-4 py-1.5 text-sm font-medium transition-colors first:rounded-l-lg last:rounded-r-lg ${
            current === value
              ? "bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-gray-100"
              : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 accent-blue-500"
      />
      <span
        className={`flex-1 ${
          todo.completed
            ? "text-gray-400 line-through"
            : "text-gray-800 dark:text-gray-100"
        }`}
      >
        {todo.text}
      </span>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="text-gray-400 transition-colors hover:text-red-500"
      >
        削除
      </button>
    </li>
  );
}

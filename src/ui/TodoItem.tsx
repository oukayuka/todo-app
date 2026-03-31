import { useEffect, useRef, useState } from "react";
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const commitEdit = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    } else {
      setDraft(todo.text);
    }
    setEditing(false);
  };

  const cancelEdit = () => {
    setDraft(todo.text);
    setEditing(false);
  };

  return (
    <li className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 accent-blue-500"
      />

      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return;
            if (e.key === "Enter") commitEdit();
            if (e.key === "Escape") cancelEdit();
          }}
          className="flex-1 rounded border border-blue-400 bg-white px-2 py-1 text-gray-800 outline-none dark:bg-gray-700 dark:text-gray-100"
        />
      ) : (
        // biome-ignore lint/a11y/noStaticElementInteractions: テキスト表示が主目的。ダブルクリック編集は補助的な操作
        <span
          onDoubleClick={() => setEditing(true)}
          className={`flex-1 cursor-pointer ${
            todo.completed
              ? "text-gray-400 line-through"
              : "text-gray-800 dark:text-gray-100"
          }`}
        >
          {todo.text}
        </span>
      )}

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

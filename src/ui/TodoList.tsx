import type { Todo } from "../types/todo";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onDelete: (id: number) => void;
}

export function TodoList({ todos, onToggle, onEdit, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return <p className="text-center text-gray-400">タスクがありません</p>;
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

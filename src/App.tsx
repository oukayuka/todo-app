import { useEffect, useMemo, useState } from "react";
import type { TodoFilter as FilterType, Todo } from "./types/todo";
import { TodoFilter } from "./ui/TodoFilter";
import { TodoForm } from "./ui/TodoForm";
import { TodoList } from "./ui/TodoList";

const STORAGE_KEY = "todos";

const loadTodos = (): Todo[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as Todo[];
  } catch {
    return [];
  }
};

function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const addTodo = (text: string) => {
    setTodos((prev) => [{ id: Date.now(), text, completed: false }, ...prev]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const editTodo = (id: number, text: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="mx-auto min-h-svh max-w-lg px-4 py-12">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
        Awesome Todo List
      </h1>
      <TodoForm onAdd={addTodo} />
      <TodoFilter current={filter} onChange={setFilter} />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onEdit={editTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}

export default App;

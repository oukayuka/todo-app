import { useState } from "react";
import { TodoForm } from "./ui/TodoForm";
import { TodoList } from "./ui/TodoList";
import type { Todo } from "./types/todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos((prev) => [
      { id: Date.now(), text, completed: false },
      ...prev,
    ]);
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
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onEdit={editTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}

export default App;

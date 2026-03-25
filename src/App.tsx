import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, completed: false },
    ]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
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

      <form
        className="mb-6 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="新しいタスクを入力..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-800"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-600 active:bg-blue-700"
        >
          追加
        </button>
      </form>

      {todos.length === 0 ? (
        <p className="text-center text-gray-400">タスクがありません</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
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
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-400 transition-colors hover:text-red-500"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

"use client";

import { useTodos } from "../store/Todos";
import { useSearchParams } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";

const Todo = () => {
  const { todos, toggleTodoAsCompleted, handleTodoDeleted } = useTodos();
  const searchParams = useSearchParams();
  const todosFilter = searchParams.get("todos");
  let filteredTodos = todos;

  if (todosFilter === "active") {
    filteredTodos = filteredTodos.filter((todo) => !todo.isCompleted);
  } else if (todosFilter === "completed") {
    filteredTodos = filteredTodos.filter((todo) => todo.isCompleted);
  }

  return (
    <ul>
      {filteredTodos.map((todo) => {
        const listItemClass = todo.isCompleted ? "bg-red-50" : "";
        const labelClass = todo.isCompleted
          ? "line-through italic text-red-900"
          : "";

        return (
          <li
            key={todo.id}
            className={`grid md:grid-cols-5 grid-cols-4 break-words items-center md:w-[700px] w-full min-h-[75px] border-b border-solid first:border-t py-4 hover:bg-red-50 ${listItemClass}`}
          >
            <input
              type="checkbox"
              id={`todo-${todo.id}`}
              checked={todo.isCompleted}
              onChange={() => toggleTodoAsCompleted(todo.id)}
              className="cursor-pointer"
            />
            <label
              htmlFor={`todo-${todo.id}`}
              className={`text-gray-700 md:text-lg text-sm md:col-span-2 ${labelClass}`}
            >
              {todo.task}
            </label>
            <span className="text-gray-500 text-xs md:text-sm">
              {todo.dueDate ? `Due: ${todo.dueDate}` : "No due date"}
            </span>
            {todo.isCompleted && (
              <button
                type="button"
                onClick={() => handleTodoDeleted(todo.id)}
                className="flex items-center self-center md:gap-2 gap-1 justify-center bg-red-600 hover:bg-red-700 py-2 rounded ml-6 text-white font-bold text-xs md:text-base md:w-28 w-16"
              >
                Delete <FiTrash2 />
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};
export default Todo;

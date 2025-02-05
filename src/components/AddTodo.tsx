"use client";

import { useTodos } from "../store/Todos";
import { FormEvent, useState } from "react";

const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const [dueDate, setDueDate] = useState("");

  const { handleAddTodo } = useTodos();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo.length === 0) {
      alert("Can't add an empty todo");
      return;
    }
    handleAddTodo(todo, dueDate);
    setTodo("");
    setDueDate("");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Add New Todo</h2>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter the todo..."
          value={todo}
          
          onChange={(e) => setTodo(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm"
        />
        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-700 px-5 py-2 rounded-lg text-white font-bold transition duration-300 shadow-md">
          ADD TODO
        </button>
      </form>
    </div>
  );
};

export default AddTodo;

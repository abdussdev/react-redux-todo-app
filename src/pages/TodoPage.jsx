import React from "react";
import CreateTodo from "../components/CreateTodo";
import TodoList from "../components/TodoList";
import TotalCompleteItems from "../components/TotalCompleteItems";

const TodoPage = () => {
  return (
    <div className="mt-8 mr-auto ml-auto max-w-5xl p-8 bg-gray-600  border-gray-300 rounded-md shadow">
      <CreateTodo />
      <TodoList />
      <TotalCompleteItems />
    </div>
  );
};

export default TodoPage;

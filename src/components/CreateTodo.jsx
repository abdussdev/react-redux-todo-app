import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

const CreateTodo = () => {
  const dispatch = useDispatch();

  const [todoText, setTodoText] = useState("");

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTodo({
        title: todoText,
      })
    );
    setTodoText("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="mb-12 text-center text-4xl text-white font-medium">
          My Todo App
        </h1>
        <div className="flex mb-8">
          <div className="block w-10/12 items-start">
            <input
              type="text"
              placeholder="Write your todo..."
              className="border border-gray-300 bg-gray-50 text-gray-900 text-md font-normal rounded-md block w-full p-2.5"
              value={todoText}
              onChange={handleInputChange}
            />
          </div>
          <div className="block w-2/12 text-end">
            <button
              type="submit"
              className="w-5/6 text-white bg-blue-900 hover:bg-blue-950 font-medium rounded-md text-md p-3"
            >
              ADD TODO
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTodo;

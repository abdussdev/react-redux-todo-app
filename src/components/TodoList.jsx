import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  editTodoAsync,
  toggleComplete,
  deleteTodoAsync,
} from "../features/todo/todoSlice";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleCompleteClick = (id, title, isComplete) => {
    if (!isComplete) {
      Swal.fire({
        title: "Mark as Complete?",
        text: `Do you want to mark "${title}" as complete?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, mark as complete",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(toggleComplete(id));
          Swal.fire({
            title: "Marked as Complete",
            text: `"${title}" has been marked as complete.`,
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
          });
        }
      });
    } else {
      dispatch(toggleComplete(id));
    }
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteTodoAsync(id));
  };

  const handleEditClick = (todo) => {
    dispatch(editTodoAsync(todo));
  };

  return (
    <div className="relative overflow-x-auto bg-gray-600 shadow-md sm:rounded-lg">
      <table className="w-full text-md text-left text-white">
        <thead className="text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">COMPLETE</th>
            <th className="px-6 py-3">Todo No</th>
            <th className="px-6 py-3">Todo Name</th>
            <th className="px-6 py-3 text-center">EDIT</th>
            <th className="px-6 py-3 text-center">REMOVE</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => {
            const rowClass = index % 2 === 0 ? "row-even" : "row-odd";
            return (
              <tr key={todo.id} className={rowClass}>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-900 rounded"
                    checked={todo.complete}
                    onChange={() =>
                      handleCompleteClick(todo.id, todo.title, todo.complete)
                    }
                  />
                </td>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  <span
                    style={{
                      textDecoration: todo.complete ? "line-through" : "none",
                    }}
                  >
                    {todo.title}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleEditClick(todo)}
                    className="text-white bg-green-600 hover:bg-green-800 font-medium rounded-md text-md px-5 py-2"
                  >
                    EDIT
                  </button>
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDeleteClick(todo.id)}
                    className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-md text-md px-5 py-2"
                  >
                    REMOVE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;

import { useSelector } from "react-redux/es/hooks/useSelector";

const TotalCompleteItems = () => {
  const totalCompleteTodos = useSelector((state) =>
    state.todos.filter((todo) => todo.complete === true)
  );

  return (
    <div>
      <h2 className="mt-8 text-xl text-gray-900 bg-gray-50 font-medium rounded-md block w-full p-2.5 ">
        Total Complete Todos: {totalCompleteTodos.length}
      </h2>
    </div>
  );
};

export default TotalCompleteItems;

import Swal from "sweetalert2";
import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [
    { id: "1", title: "My first todo", complete: true },
    { id: "2", title: "Complete todo", complete: false },
    { id: "3", title: "Another todo", complete: false },
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now().toString(),
        title: action.payload.title,
        complete: false,
      };
      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const todoToUpdate = state.find((todo) => todo.id === action.payload);
      if (todoToUpdate) {
        todoToUpdate.complete = !todoToUpdate.complete;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const updatedTodo = action.payload;
      return state.map((todo) =>
        todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
      );
    },
  },
});

// The actual async action creator using Redux Thunk.
export const deleteTodoAsync = (todoId) => (dispatch) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(deleteTodo(todoId));
      Swal.fire({
        title: "Deleted!",
        text: "Your todo has been deleted.",
        icon: "success",
        timer: 2000, // Display the success message for 2 seconds
        timerProgressBar: true,
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "Cancelled",
        text: "Your todo is safe!",
        icon: "error",
        timer: 2000, // Display the error message for 2 seconds
        timerProgressBar: true,
      });
    }
  });
};

// The actual async action creator using Redux Thunk for editTodo.
export const editTodoAsync = (updatedTodo) => (dispatch) => {
  Swal.fire({
    title: "Edit Todo",
    html: `<input id="swal-input1" class="swal2-input" value="${updatedTodo.title}">`,
    focusConfirm: false,
    preConfirm: () => {
      const title = document.getElementById("swal-input1").value;
      if (title.trim() === "") {
        Swal.showValidationMessage("Title cannot be empty");
      }
      return { ...updatedTodo, title };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(editTodo(result.value));
      Swal.fire({
        title: "Updated!",
        text: "Your todo has been updated.",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "Cancelled",
        text: "Your todo remains unchanged.",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
      });
    }
  });
};


export const { addTodo, toggleComplete, editTodo, deleteTodo } =
  todoSlice.actions;
export default todoSlice.reducer;

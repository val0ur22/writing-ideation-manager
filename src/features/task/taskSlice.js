import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    taskList: JSON.parse(localStorage.getItem("tasks")) || [],
    },
    reducers: {
      addToList: (state, action) => {
        state.taskList.push(action.payload);
        localStorage.setItem("tasks", JSON.stringify(state.taskList));
      },
      updateTask: (state, action) => {
        const index = state.taskList.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.taskList[index] = action.payload;
          localStorage.setItem("tasks", JSON.stringify(state.taskList));
        }
      },
      removeTask: (state, action) => {
        state.taskList = state.taskList.filter(
          (task) => task.id !== action.payload
        );
        localStorage.setItem("tasks", JSON.stringify(state.taskList));
      },
    },
  });


export const { addToList, updateTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  task: "",
  list: [],
  completed: [],
  editTask: false,
  editText: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setText: (state, action) => {
      state.editText = action.payload;
    },
    setEditValue: (state, action) => {
      const newList = state.list.map((item) =>
        item.id === action.payload.id ? { ...item, task: state.editText } : item
      );
      state.list = newList;
      console.log(state.list);
    },
    setEdit: (state, action) => {
      // const foundTask = state.todo.list.find(
      //   (item) => item.id === action.payload
      // );
      if (action.payload.edit === false) {
        const newList = state.list.map((item) =>
          item.id === action.payload.id ? { ...item, edit: true } : item
        );
        state.list = newList;
      }
      if (action.payload.edit === true) {
        const newList = state.list.map((item) =>
          item.id === action.payload.id ? { ...item, edit: false } : item
        );
        state.list = newList;
      }
      console.log(state.list);
    },
    setJett: (state, action) => {
      console.log(action.payload);
      if (action.payload.origin === "complete") {
        const IdCheck = state.completed.findIndex(
          (item) => item.id === action.payload.id
        );
        let newList = [...state.completed];
        if (IdCheck >= 0) {
          console.log("already here");
          // state.completed = [...state.completed, action.payload];
          newList.splice(IdCheck, 1);
          state.completed = newList;
        }
      } else if (action.payload.origin === "active") {
        const IdCheck = state.list.findIndex(
          (item) => item.id === action.payload.id
        );
        let newList = [...state.list];
        if (IdCheck >= 0) {
          newList.splice(IdCheck, 1);
          state.list = newList;
        }
      }
    },
    setTask: (state, action) => {
      state.task = action.payload;
    },
    setCompleted: (state, action) => {
      const IdCheck = state.completed.findIndex(
        (item) => item.id === action.payload.id
      );
      let newList = [...state.list];
      if (IdCheck >= 0) {
        console.log("already here");
        return;
      } else {
        state.completed = [...state.completed, action.payload];
        newList.splice(IdCheck, 1);
        state.list = newList;
      }
    },
    setList: (state, action) => {
      console.log("pressed", action.payload);
      if (state.task) {
        state.list = [
          ...state.list,
          {
            id: Date.now(),
            task: action.payload,
            undo: false,
            origin: "active",
            edit: false,
          },
        ];
        state.task = "";
      }
    },
    undoTask: (state, action) => {
      console.log("undo");
      const IdCheck = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      let newList = [...state.completed];

      state.list = [...state.list, action.payload];
      newList.splice(IdCheck, 1);
      state.completed = newList;
    },
  },
});

export const {
  setTask,
  setCompleted,
  setList,
  undoTask,
  removeTask,
  akbar,
  setJett,
  setEdit,
  setEditValue,
  setText,
} = todoSlice.actions;

export default todoSlice.reducer;

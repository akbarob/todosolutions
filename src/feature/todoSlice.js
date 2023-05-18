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
    setRefresh1: (state, action) => {
      console.log(action.payload);
      state.list = action.payload;
    },
    setRefresh2: (state, action) => {
      console.log(action.payload);
      state.completed = action.payload;
    },
    setText: (state, action) => {
      state.editText = action.payload;
    },
    setEditValue: (state, action) => {
      const newList = state.list.map((item) =>
        item.id === action.payload.id ? { ...item, task: state.editText } : item
      );
      state.list = newList;
      localStorage.setItem("active", JSON.stringify(state.list));
      // localStorage.setItem("complete", JSON.stringify(state.completed));
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
        localStorage.setItem("active", JSON.stringify(state.list));
        // localStorage.setItem("complete", JSON.stringify(state.completed));
      }
      if (action.payload.edit === true) {
        const newList = state.list.map((item) =>
          item.id === action.payload.id ? { ...item, edit: false } : item
        );
        state.list = newList;
        localStorage.setItem("active", JSON.stringify(state.list));
        // localStorage.setItem("complete", JSON.stringify(state.completed));
      }
      console.log(state.list);
    },
    setDelete: (state, action) => {
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
          // localStorage.setItem("active", JSON.stringify(state.list));
          localStorage.setItem("complete", JSON.stringify(state.completed));
        }
      } else if (action.payload.origin === "active") {
        const IdCheck = state.list.findIndex(
          (item) => item.id === action.payload.id
        );
        let newList = [...state.list];
        if (IdCheck >= 0) {
          newList.splice(IdCheck, 1);
          state.list = newList;
          localStorage.setItem("active", JSON.stringify(state.list));
          // localStorage.setItem("complete", JSON.stringify(state.completed));
        }
      }
    },
    setTask: (state, action) => {
      state.task = action.payload;
    },
    setCompleted: (state, action) => {
      console.log("setcomplete", action.payload.id);

      const IdCheck = state.completed.findIndex(
        (item) => item.id === action.payload.id
      );
      let freshList = state.list.filter(
        (item) => item.id !== action.payload.id
      );
      // let newList = [...state.list];
      if (IdCheck >= 0) {
        console.log("already here");
        return;
      } else {
        state.completed = [...state.completed, action.payload];
        state.list = freshList;

        localStorage.setItem("active", JSON.stringify(state.list));
        localStorage.setItem("complete", JSON.stringify(state.completed));
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
        localStorage.setItem("active", JSON.stringify(state.list));
        state.task = "";
      }
    },
    undoTask: (state, action) => {
      console.log("undo", action.payload.id);
      const IdCheck = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      let freshList = state.completed.filter(
        (item) => item.id !== action.payload.id
      );
      state.list = [...state.list, action.payload];
      state.completed = freshList;
      localStorage.setItem("active", JSON.stringify(state.list));
      localStorage.setItem("complete", JSON.stringify(state.completed));
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
  setDelete,
  setEdit,
  setEditValue,
  setText,
  setRefresh1,
  setRefresh2,
} = todoSlice.actions;

export default todoSlice.reducer;

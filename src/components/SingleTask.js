import {
  akbar,
  removeTask,
  setCompleted,
  setDelete,
  setEdit,
  setEditTask,
  setEditValue,
  setJett,
  setTask,
  setText,
  undoTask,
} from "@/feature/todoSlice";
import React, { useRef, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FcUndo } from "react-icons/fc";
import { FiCheckCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

export default function SingleTask({ task, id, undo, origin, edit }) {
  const inputRef = useRef(null);
  const Text = useSelector((state) => state.todo.editText);
  const dispatch = useDispatch();

  function handleDelete(id, origin) {
    // dispatch(removeTask(id, origin));
    dispatch(setDelete({ id, origin }));
    console.log(origin);
  }
  function handleUndo() {
    console.log("undoing");
    dispatch(undoTask({ id, task, undo: false, origin: "active", edit }));
  }

  function handleCompleted(id, task, edit) {
    console.log("adding");
    dispatch(setCompleted({ id, task, undo: true, origin: "complete", edit }));
  }
  // function handleEdit(id,edit) {
  //   dispatch(setEdit({id,edit}));
  // }
  return (
    <div
      className="my-2 w-full rounded-lg bg-green-600 h-10 flex justify-between items-center
     px-2"
    >
      {edit ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(setEditValue({ id }));
            dispatch(setEdit({ id, edit }));
          }}
        >
          <input
            ref={inputRef}
            autoFocus
            type="text"
            className="indent-3 outline-none rounded-lg text-blue-500"
            value={Text}
            onChange={(e) => dispatch(setText(e.target.value))}
          />
        </form>
      ) : (
        <p>{task}</p>
      )}

      <div></div>
      <div className="flex flex-row justify-end items-center gap-x-2">
        {origin === "active" && (
          <button
            className="icon"
            onClick={() => {
              dispatch(setEdit({ id, edit }));
              dispatch(setText(task));
            }}
          >
            <AiFillEdit />
          </button>
        )}

        <button className="icon" onClick={() => handleDelete(id, origin)}>
          <AiFillDelete />
        </button>
        <button
          className="icon"
          onClick={() => handleCompleted(id, task, edit)}
        >
          <FiCheckCircle />
        </button>
        {undo && (
          <button className="icon" onClick={() => handleUndo(id, task, undo)}>
            <FcUndo />
          </button>
        )}
      </div>
    </div>
  );
}

import { add, addToList, setList, setTask } from "@/feature/todoSlice";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Input() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const Task = useSelector((state) => state.todo.task);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setList(Task));
  }

  return (
    <form
      className="flex relative "
      onSubmit={(e) => {
        handleSubmit(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter a task"
        className=" rounded-lg indent-3 text-black placeholder:text-blue-600 outline-none w-full h-[50px] bg-amber-400"
        value={Task}
        onChange={(e) => dispatch(setTask(e.target.value))}
        // className=""
      />
      <button
        className="absolute inset-y-0 right-5 shadow-md bg-indigo-500 px-4 my-1 rounded-full "
        type="submit"
      >
        Go
      </button>
    </form>
  );
}

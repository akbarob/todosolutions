import React from "react";
import SingleTask from "./SingleTask";
import { useSelector } from "react-redux";

export default function TaskList() {
  const Active = useSelector((state) => state.todo.list);
  const Completed = useSelector((state) => state.todo.completed);

  return (
    <div className="">
      <h1
        className="text-center
        font-semibold text-xl my-4"
      >
        Task List
      </h1>
      <div className="flex flex-col gap-6 md:flex-row  justify-center md:justify-between items-start">
        <div className="w-full md:w-[90%] bg-indigo-700 p-2 rounded-lg">
          <h2 className="p-4 font-bold text-xl">Active task(s)</h2>
          {Active?.map((item) => (
            <SingleTask
              key={item.id}
              task={item.task}
              id={item.id}
              undo={item.undo}
              origin={item.origin}
              edit={item.edit}
            />
          ))}
        </div>
        <div className=" w-full md:w-[90%] bg-rose-700 p-2 rounded-lg">
          <h2 className="p-4 font-bold text-xl">Completed task(s)</h2>
          {Completed?.map((item) => (
            <SingleTask
              key={item.id}
              task={item.task}
              id={item.id}
              undo={item.undo}
              origin={item.origin}
              edit={item.edit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

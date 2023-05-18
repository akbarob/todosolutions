"use client";
import { useSelector, useDispatch } from "react-redux";
import Input from "@/components/Input";
import TaskList from "@/components/TaskList";
import { useEffect, useRef } from "react";
import { setRefresh1, setRefresh2 } from "@/feature/todoSlice";
export default function Home() {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.todo.list);
  const completed = useSelector((state) => state.todo.completed);

  console.log("active", active);
  console.log("completed:", completed);

  const initialRender = useRef(true);

  useEffect(() => {
    // localStorage.clear();
    // // console.log("fresh ran");

    const freshactive = JSON.parse(localStorage.getItem("active"));
    const freshcomplete = JSON.parse(localStorage.getItem("complete"));
    console.log(freshcomplete);
    console.log(freshactive);
    if (freshactive) {
      // dispatch(setFromRefresh(freshactive));
      dispatch(setRefresh1(freshactive));
    }

    if (freshcomplete) {
      console.log("fresh complete ran");

      dispatch(setRefresh2(freshcomplete));
    }
  }, []);

  return (
    <main className="m-6 lg:px-20">
      <header className="text-center text-xl font-bold mb-4 text-indigo-500">
        Todo App
      </header>
      <div>
        <Input />
      </div>
      <div>
        <TaskList />
      </div>
      {(active.length > 0 || completed.length > 0) && (
        <div className="flex justify-center items-center mt-20">
          <button
            onClick={() => {
              localStorage.clear();
              location.reload();
            }}
            className="px-4 py-2 bg-blue-700"
          >
            {" "}
            Delete All
          </button>
        </div>
      )}
    </main>
  );
}

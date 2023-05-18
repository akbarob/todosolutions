"use client";
import { useSelector, useDispatch } from "react-redux";
import Input from "@/components/Input";
import TaskList from "@/components/TaskList";
export default function Home() {
  const dispatch = useDispatch();
  const TodoList = useSelector((state) => state.todo.list);
  const CompletedList = useSelector((state) => state.todo.completed);

  console.log(TodoList);
  console.log("completed:", CompletedList);
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
    </main>
  );
}

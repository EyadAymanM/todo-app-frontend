import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCheckIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

function AddTodo() {

  // Using the query client to invalidate the cache and refetch the data
  const queryClient = useQueryClient();
  // new Todo State
  const [todo, setTodo] = useState({
    title: "",
    tasks: [{ task: "" }],
  });
  // submitted State
  const [submitted, setSubmitted] = useState(false);
  // new Todo Mutation
  const addNewTodoMutation = useMutation({
    mutationFn: ({ title, tasks }: { title: string, tasks: { task: string }[] }) =>
      addNewTodo(title, tasks),
    onSuccess: () => {
      setSubmitted(true)
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });
  // add new Todo Request Function
  const addNewTodo = async (title: string, tasks: { task: string }[]) => {
    await fetch(
      `http://localhost:3000/todo`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        },
        body: JSON.stringify({ title, tasks }),
        method: 'POST',
      }
    )
  }
  // Function for Handling new Todo State
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };
  const handleTaskChange = (index: number, value: string) => {
    const updatedTasks = [...todo.tasks];
    updatedTasks[index].task = value;
    setTodo((prev) => ({
      ...prev,
      tasks: updatedTasks,
    }));
  };
  const addTaskField = () => {
    setTodo((prev) => ({
      ...prev,
      tasks: [...prev.tasks, { task: "" }],
    }));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { title, tasks } = todo
    addNewTodoMutation.mutate({ title, tasks })
  };

  if (submitted)
    return (
      <div className="h-40 flex flex-col justify-center items-center gap-1">
        <span className="text-3xl font-bold font-josefin">
          Added
        </span>
        <span className="bg-green-400 p-3 rounded-full">
          <CheckCheckIcon className="w-24 h-24  text-white " />
        </span>
      </div>
    )

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg"
    >

      {/* Title Feild */}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium font-roboto">Title</span>
        <input
          type="text"
          required
          value={todo.title}
          onChange={handleTitleChange}
          className="border p-2 font-josefin"
          placeholder="To-Do Title"
          autoFocus
        />
      </label>

      {/* Tasks Feilds */}
      {todo.tasks.map((taskObj, index) => (
        <label key={index} className="flex flex-col gap-1">
          <span className="text-sm font-medium font-roboto">Task {index + 1}</span>
          <input
            type="text"
            required
            value={taskObj.task}
            onChange={(e) => handleTaskChange(index, e.target.value)}
            className="border p-2 font-josefin"
            placeholder={`type your task`}
          />
        </label>
      ))}

      {/* Function Buttons */}
      <span className="flex justify-around gap-8 bg-white w-full pt-8 ">
        <button
          type="button"
          onClick={addTaskField}
          className="font-roboto bg-[#FFD6BA] text-white text-shadow-lg cursor-pointer px-3 py-2 hover:bg-[#f8c09b] transition"
        >
          + Add Task
        </button>

        <button
          type="submit"
          className="font-roboto bg-[#89B0AE] text-white text-shadow-lg cursor-pointer px-3 py-2 hover:bg-[#5baca8] transition"
        >
          Submit To-Do
        </button>
      </span>
    </form>
  );
}

export default AddTodo;

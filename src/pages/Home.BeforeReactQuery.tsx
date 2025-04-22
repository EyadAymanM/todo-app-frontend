import Header from "@/components/Header"
import Todo from "@/components/Todo"
import { todo } from "@/types/todo.type";
import { useState } from "react";

function HomeWithoutReactQuery() {



  const [todoList, setTodoList] = useState<any[]>([
    {
      title: "Morning Routine",
      tasks: [
        { task: "Wake up", completed: true },
        { task: "Brush teeth", completed: true },
        { task: "Exercise", completed: false },
        { task: "Shower", completed: false },
        { task: "Eat breakfast", completed: false }
      ]
    },
    {
      title: "Work Tasks",
      tasks: [
        { task: "Check emails", completed: true },
        { task: "Team meeting", completed: false },
        { task: "Finish report", completed: false },
        { task: "Code review", completed: false }
      ]
    },
    {
      title: "Grocery Shopping",
      tasks: [
        { task: "Buy milk", completed: true },
        { task: "Get eggs", completed: false },
        { task: "Pick up bread", completed: false },
        { task: "Grab some fruits", completed: false }
      ]
    },
    {
      title: "Evening Routine",
      tasks: [
        { task: "Dinner", completed: false },
        { task: "Watch a movie", completed: false },
        { task: "Read a book", completed: false },
        { task: "Go to bed", completed: false }
      ]
    }
  ]);

  const handleCompletedToggle = (todoIdx: number, taskIdx: number): void => {

    setTodoList(prevTodoList =>
      prevTodoList.map((todo, i) =>
        todoIdx === i ? {
          ...todo,
          tasks: todo.tasks.map((task, i) =>
            i === taskIdx ? { ...task, completed: !task.completed } : task
          )
        }
          : todo
      ))
  }
  
  return (
    <>
      <div className="pt-8 px-4 sm:px-10 lg:px-20 bg-[#BEE3DB] w-screen h-screen">
        <Header />
        <div className="flex flex-wrap justify-around gap-4 pt-3">
          {todoList.map((todo, todoIdx) => <Todo key={todoIdx} todo={todo} todoIdx={todoIdx} toggleCompletion={handleCompletedToggle} />)}
        </div>
      </div>
    </>
  )
}
export default HomeWithoutReactQuery
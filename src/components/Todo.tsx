import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { todo } from "@/types/todo.type"
import { Pen, Trash } from "lucide-react";
import { FormEvent } from "react"
import { DialogClose } from "@radix-ui/react-dialog"


interface TodoProps {
  todo: todo;
  editTask: (taskId: number, newTask: string) => void;
  toggleCompleted: (taskId: number, completed: boolean) => void;
  deleteTask: (taskId: number) => void;
}


const Todo: React.FC<TodoProps> = ({ todo, editTask, toggleCompleted,deleteTask }) => {



  return (
    <div className="w-fit font-josefin">
      {/* Accordion */}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">

          {/* Todo Title */}
          <AccordionTrigger className="hover:no-underline peer-data[state=checked]:bg-black">
            <div className="flex gap-20 w-full">
              <div className="w-40 ps-3 font-roboto text-nowrap text-shadow font-bold">{todo.title}</div>
              <div className="flex justify-center items-center relative w-36 px-6">
                <Progress className="w-full absolute h-6" value={todo.tasks.reduce((acc, task) => acc + (task.completed ? 1 : 0), 0) / todo.tasks.length * 100} />
                <span className="z-10 text-[#FAF9F9]">Progress: {Math.floor(todo.tasks.reduce((acc, task) => acc + (task.completed ? 1 : 0), 0) / todo.tasks.length * 100)}%</span>
              </div>
            </div>
          </AccordionTrigger>


          {/* Todo tasks */}
          <AccordionContent className="p-3 rounded-xl bg-[#89B0AE] shadow peer">
            <ul>
              {todo.tasks.map(({ task, completed, id }, taskIdx) =>
                <li
                  key={taskIdx}
                  className="flex justify-between group items-center m-1 p-1 rounded cursor-pointer hover:bg-[#BEE3DB] select-none"
                  onClick={() => toggleCompleted(id, completed)}
                >
                  <span>{task}</span>
                  <span className="flex items-center gap-3">
                    <span className="p-2 hover:bg-[#FF6B6B] rounded-full" onClick={(e) => e.stopPropagation()}>
                      <Dialog>
                        <DialogTrigger className="flex cursor-pointer">
                          <Trash className="w-4 h-4" />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="font-roboto">Delete task</DialogTitle>
                          </DialogHeader>
                          <span className="font-josefin">Are you sure you want to delete this taks?</span>
                          <form className="flex flex-col gap-4" onSubmit={(e: FormEvent) => { e.preventDefault(); deleteTask(id)}}>
                            <button className="font-roboto w-fit px-2 py-1 bg-[#FF6B6B] hover:bg-[#ff2626] rounded-lg self-center cursor-pointer">
                              <DialogClose>
                                Delete
                              </DialogClose>
                            </button>
                          </form>
                        </DialogContent>
                      </Dialog>

                    </span>
                    <span className="p-2 hover:bg-[#4ECDC4] rounded-full" onClick={(e) => e.stopPropagation()}>
                      <Dialog>
                        <DialogTrigger className="flex cursor-pointer"><Pen className="w-4 h-4" /></DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit task</DialogTitle>
                          </DialogHeader>
                          <form className="flex flex-col gap-4" onSubmit={(e: FormEvent) => { e.preventDefault(); editTask(id, e.target[0].value) }}>
                            <input type="text" defaultValue={task} className="p-2 border-1 rounded-sm font-josefin" autoFocus />
                            <button className="font-roboto w-fit px-2 py-1 bg-[#4ECDC2] hover:bg-[#5998c2] rounded-lg self-end me-4 cursor-pointer">
                              <DialogClose>
                                update
                              </DialogClose>
                            </button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </span>
                    <span>
                      <Checkbox className="m-1 cursor-pointer bg-[#EAE9E9] group-hover:bg-[#00cc55a2]" checked={completed} />
                    </span>
                  </span>
                </li>)}
            </ul>
          </AccordionContent>


        </AccordionItem>
      </Accordion>
    </div>
  )
}
export default Todo
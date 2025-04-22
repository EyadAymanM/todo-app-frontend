import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddTodo from "./AddTodo";

function Header() {

  const navigate = useNavigate()

  const user = localStorage.getItem("user") || sessionStorage.getItem("user");

  const handleLogout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="h-14 w- bg-[#555B6E] flex justify-between px-12 items-center text-center hover:border-[#89B0AE] hover:border-b-4 hover:border-r-4 shadow-2xl duration-100">
      {/* Add ToDo Button */}
      <Dialog>
        <DialogTrigger>
          <span className="flex gap-1 font-josefin bg-[#E2E8F0] hover:bg-[#BEE3DB] hover:text-[#fff] hover:text-shadow-lg py-0.5 px-1.5 border-[#89B0AE] border-b-3 border-r-3 shadow-2xl cursor-pointer">
            <span className="hidden sm:block">Add Todo</span>{" "}
            <PlusIcon className="w-5 h-5" />
          </span>
        </DialogTrigger>
        <DialogContent className="overflow-y-scroll max-h-[600px]">
          <DialogHeader className="justify-center flex-row">
            <DialogTitle>New To-Do</DialogTitle>
          </DialogHeader>
          <AddTodo />
        </DialogContent>
      </Dialog>

      {/* Center Header */}
      <h2 className="font-roboto text-2xl font-bold tracking-[10px] select-none border-[#89B0AE] border-b-3 border-r-3 shadow-lg text-[#1E293B] bg-[#E2E8F0] py-1 px-2">
        TO-DO
      </h2>

      <DropdownMenu>
        <DropdownMenuTrigger className="font-josefin bg-[#E2E8F0] hover:bg-[#BEE3DB] hover:text-[#fff] hover:text-shadow-lg py-0.5 px-1.5 border-[#89B0AE] border-b-3 border-r-3 shadow-2xl cursor-pointer">
          {user}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-8">
          <DropdownMenuItem className="cursor-pointer px-2" onClick={handleLogout}>
            log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
export default Header;



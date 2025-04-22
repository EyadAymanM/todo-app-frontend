import Header from "@/components/Header"
import Todo from "@/components/Todo"
import { todo } from "@/types/todo.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate()
  const queryClient = useQueryClient();

  // Get All Todos Function
  const fetchTodoList = async () => {
    const res = await fetch(
      `http://localhost:3000/todo`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        },
        method: 'GET',
      }
    )
    const { data, error } = await res.json()
    if (error) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      navigate('/login')
    }
    return data
  }
  // Toggle Task Completion
  const updateTaskCompletion = async (taskId: number, update: number) => {
    const res = await fetch(
      `http://localhost:3000/todo/task/completed/${taskId}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `${sessionStorage.getItem('token') || sessionStorage.getItem('token')}`
        },
        body: JSON.stringify({ completed: update }),
        method: 'PATCH',
      }
    )
    const { error, message } = await res.json()
    console.log(error);
    console.log(message);
  }
  // Update Task Title
  const updateTaskTitle = async (taskId: number, update: string) => {
    const res = await fetch(
      `http://localhost:3000/todo/task/title/${taskId}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        },
        body: JSON.stringify({ title: update }),
        method: 'PATCH',
      }
    )
    const { error, message } = await res.json()
    console.log(error);
    console.log(message)
  }
  // Delete Task
  const deleteTask = async (taskId: number) => {
    const res = await fetch(
      `http://localhost:3000/todo/task/${taskId}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        },
        method: 'DELETE',
      }
    )
    const { error } = await res.json()
    if (!error) console.log("deleted successfully");
  }
  // Query Hook
  const { status, data: todoList, error } = useQuery<todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodoList
  })

  // Mutation Hook for upating task completion
  const updateTaskCompletionMutation = useMutation({
    mutationFn: ({ taskId, update }: { taskId: number, update: number }) =>
      updateTaskCompletion(taskId, update),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // Refetch the todos after mutation
    }
  });
  // function passed to reusable component
  const handleToggleCompletion = (id: number, bool: boolean) => updateTaskCompletionMutation.mutate({ taskId: id, update: bool ? 1 : 0 })

  // Mutation Hook for upating task title
  const updateTaskTitleMutation = useMutation({
    mutationFn: ({ taskId, update }: { taskId: number, update: string }) =>
      updateTaskTitle(taskId, update),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });
  // function passed to reusable component
  const handleEdit = (id: number, text: string) => updateTaskTitleMutation.mutate({ taskId: id, update: text })

  // Mutation Hook for deleting a task
  const deleteTaskMutation = useMutation({
    mutationFn: ({ taskId }: { taskId: number }) =>
      deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });
  // function passed to reusable component
  const handleDelete = (id: number) => deleteTaskMutation.mutate({ taskId: id })


  if (status === 'pending') {
    return <div className="pt-8 px-4 sm:px-10 lg:px-20 bg-[#BEE3DB] w-screen h-screen">Loading...</div>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }
  return (
    <>
      <div className="pt-8 px-4 sm:px-10 lg:px-20 bg-[#BEE3DB] w-screen h-screen">
        <Header />
        <div className="flex flex-wrap justify-around gap-4 pt-3">
          {
            todoList.length == 0 ?
              <h1 className="font-roboto text-[#555B6E] text-2xl mt-10 text-center">You Have no Todos to Display <span className="font-josefin text-lg text-[#89B0AE]">Add some...</span></h1>
              :
              todoList.map((todo) => <Todo key={todo.id} todo={todo} toggleCompleted={handleToggleCompletion} editTask={handleEdit} deleteTask={handleDelete} />)
          }
        </div>
      </div>
    </>
  )
}
export default Home
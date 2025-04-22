export interface task {
  id:number,
  task: string,
  completed: boolean,
  todoId:number
}

export interface todo {
  id:number,
  title: string,
  tasks: task[]
}
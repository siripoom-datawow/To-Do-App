import { useState,useEffect } from "react"
import { todoInterface } from "@/types/todo";
import { SingleTask } from "./SingleTask";
import {useMutation,  useQueryClient } from "@tanstack/react-query"
import { createToDo } from "@/utils/axiosQueries";
import { useToast } from '@chakra-ui/react'

interface TaskProps {
  todo: todoInterface[] | undefined;
}

export const Tasks:React.FC<TaskProps> = (props) =>{
  const toast = useToast()
  const queryClient = useQueryClient();
  const [filteredToDO,setFilteredToDo] = useState<todoInterface[] | undefined>(undefined)
  const [taskSortOpen, setTaskSortOpen] = useState<boolean>(false)
  const [taskSort, setTaskSort] = useState<string>('All')
  const [newTask, setNewTask] = useState<string>('')
  const {todo,} = props


  const {mutate:createTaskFn} = useMutation({ mutationFn: createToDo,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['todos'] })
      toast({
        title: 'Todo Created.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    },
  });

  const addNewTask = (e: React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === 'Enter' && newTask){
      const newId = new Date().getTime()
     createTaskFn({id:newId.toString(), title: newTask, completed: false })
     setNewTask('')
    }
  }

  const taskSortFilter = ():void=> {
    if(todo && taskSort !== "All"){
      let taskFilter = [...todo]
      if (taskSort === "Done"){
        setFilteredToDo(taskFilter.filter((task)=> task.completed === true))
      }else {
        setFilteredToDo(taskFilter.filter((task)=> task.completed === false))
      }
    }else {
      setFilteredToDo(todo)
    }
  }

  useEffect(()=>{
    taskSortFilter()
  },[taskSort,todo])
  

  return (
    <section className="flex flex-col w-full h-fit mt-5">
      <div className="flex justify-between w-full ">
        <h1 className=" font-[500] text-[24px]">Tasks</h1>
        <div className="relative">
          <button className="flex justify-between items-center p-2 w-[110px] h-[29px] rounded-[10px] bg-white" onClick={()=>setTaskSortOpen(!taskSortOpen)}>
          <p className="text-[13px]">{taskSort}</p>
          <p className="text-[13px]">▾</p>
        </button>
        {taskSortOpen &&  <div className="absolute z-50 top-[32px]  flex flex-col gap-1 items-center justify-center w-full h-[110px] p-2 shadow-md bg-white rounded-[10px]">
            <button className={`w-full flex items-center h-[28px] rounded-[8px] text-start text-[14px] p-2 ${taskSort === 'All' && 'bg-[#585292] text-white'}`} onClick={()=>{setTaskSort('All');  setTaskSortOpen(false)}}>All</button>
            <button className={`w-full flex items-center h-[28px] rounded-[8px] text-start text-[14px] p-2 ${taskSort === 'Done' && 'bg-[#585292] text-white'}`} onClick={()=>{setTaskSort('Done');  setTaskSortOpen(false)}}>Done</button>
            <button className={`w-full flex items-center h-[28px] rounded-[8px] text-start text-[14px] p-2 ${taskSort === 'Undone' && 'bg-[#585292] text-white'}`} onClick={()=>{setTaskSort('Undone');  setTaskSortOpen(false)}}>Undone</button>
          </div>}
        </div>

      </div>
      <div className="flex flex-col w-full gap-5 mt-5">
        {filteredToDO?.map((todo)=>{
          return <div key={todo.id}><SingleTask todo={todo}/></div>
        })}
        {taskSort !== 'Done' && <input className="flex items-center justify-between  w-full h-[50px] bg-white rounded-full p-5" placeholder="Add your todo" onKeyDown={addNewTask} onChange={(e)=>setNewTask(e.target.value)} value = {newTask}/>}
      </div>

    </section>
  )
}

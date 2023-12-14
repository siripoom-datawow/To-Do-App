import { todoInterface } from "@/types/todo";
import { useState,useEffect } from "react";
interface ProgressBarProps {
  todo: todoInterface[] | undefined;
}

export const ProgressBar:React.FC<ProgressBarProps> = ({todo}) =>{
  const [completedTask, setCompletedTask] = useState<number>(0)
  const [barProgress, setBarProgress] = useState<number>(0)


  const completedTasksCalculation = ():void =>{
    const finishedTasks = todo?.filter((task)=> task.completed)
    if (finishedTasks && todo){
      const percentage = finishedTasks.length *100 / todo.length
      setBarProgress(Number(percentage.toFixed(0)))
    }

    setCompletedTask(finishedTasks?.length || 0)
  }

  useEffect(()=>{
    completedTasksCalculation()
  },[todo])

  return (
    <div className="flex flex-col w-full h-[123px] bg-[#E07C7C] p-[20px] rounded-[20px] gap-[8px]">
      <h1 className="font-[500] text-[24px] text-white h-fit">Progress</h1>
      <div className="h-[8px] w-full rounded-full bg-[#3B3B3B]">
        <div style={{ width: `${barProgress}%` }}  className='h-full rounded-full bg-white transition-all duration-500'></div>
      </div>
      <h5 className="text-[16px] text-[#EBB9B8] h-fit">{completedTask} completed</h5>

    </div>
  )
}

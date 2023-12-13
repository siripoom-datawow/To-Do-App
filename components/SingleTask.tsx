import { useState } from "react"
import { todoInterface } from "@/types/todo"

interface SingleTaskProps {
  todo: todoInterface
}

export const SingleTask:React.FC<SingleTaskProps> = (props) =>{
  const {todo} = props
  return (
    <section className="flex items-center justify-between  w-full h-[50px] bg-white rounded-full p-5">
      <div className="flex items-center gap-5">
        <button className="w-[22px] h-[22px] rounded-[6px] border-[2px] border-[#585292]"></button>
        <p className="text-[16px]">{todo.title}</p>
      </div>
      <button className="text-[16px]">⋯</button>
    </section>
  )
}

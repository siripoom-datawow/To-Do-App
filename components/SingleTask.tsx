import { useState } from "react"
import { todoInterface } from "@/types/todo"
import { updateToDo } from "@/utils/axiosQueries"
import { OptionBox } from "./OptionBox"
import Image from "next/image"
import checked from "@/public/Vector.svg"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface SingleTaskProps {
  todo: todoInterface
}

export const SingleTask:React.FC<SingleTaskProps> = (props) =>{
  const {todo} = props
  const queryClient = useQueryClient();
  const [singleToDo, setSingleToDo] = useState<todoInterface>(todo)
  const [taskTitle,setTaskTitle]= useState<string>(todo.title)
  const [optionBoxOpen, setOptionBoxOpen] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)

  const {mutate:updateToDoFn} = useMutation({ mutationFn: updateToDo,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['todos'] })
    },
  });

  const updateMarkDone = () =>{
    setSingleToDo({...singleToDo, completed: !singleToDo.completed})
    updateToDoFn({...todo, completed: !todo.completed})
  }

  const handleEditSave =  () => {
    updateToDoFn({...todo, title : taskTitle})
    setEdit(false)
  }

  return (
    <section className="flex items-center justify-between  w-full h-[50px] bg-white rounded-full p-5">
      <div className="flex items-center gap-5 w-[90%]">
        {!edit && <button className={`flex justify-center items-center w-[22px] h-[22px] rounded-[6px] border-[2px] border-[#585292] ${singleToDo.completed && 'bg-[#585292]'}`} onClick={updateMarkDone}>
          {singleToDo.completed && <Image src={checked} alt="Checked Icon" className="w-[10px] h-[8px]"></Image>}
        </button>}
        <input disabled={!edit} type='text' value={taskTitle} className={`text-[16px] w-full bg-inherit ${singleToDo.completed && 'line-through text-gray-300'} transition-all duration-300`} onKeyDown={(e)=> e.key === 'Enter' && handleEditSave()} onChange={(e)=>setTaskTitle(e.target.value)}/>
      </div>
      <div className="relative w-[10%]">
        {!edit && <button className="text-[16px]" onClick={()=>setOptionBoxOpen(!optionBoxOpen)}>⋯</button>}
        {edit &&  <button className="w-[64px] h-[36px] rounded-full text-[16px] text-white bg-[#585292] " onClick={handleEditSave}>Save</button>}
        {optionBoxOpen && <OptionBox setEdit={setEdit} setOptionBoxOpen={setOptionBoxOpen} id={todo.id}/>}
      </div>
    </section>
  )
}

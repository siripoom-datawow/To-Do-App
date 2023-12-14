import { Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteToDo } from "@/utils/axiosQueries";


interface optionBoxProps {
  setEdit:Dispatch<SetStateAction<boolean>>
  setOptionBoxOpen:Dispatch<SetStateAction<boolean>>
  id:string
}


export const OptionBox:React.FC<optionBoxProps> = ({setEdit,setOptionBoxOpen,id}) =>{
  const queryClient = useQueryClient();
  const {mutate:deleteFn} = useMutation({ mutationFn: deleteToDo,
    onSuccess: () => {
      setOptionBoxOpen(false)
      queryClient.refetchQueries({ queryKey: ['todos'] })
    },
  });

  return (
    <div className="absolute right-0 z-50 flex flex-col items-start w-[110px] h-[80px] bg-white p-[20px] rounded-[10px] gap-[8px] shadow-md">
      <button className="text-[14px]">Edit</button>
      <button className="text-[14px] text-[#E07C7C]" onClick={()=>deleteFn(id)}>Delete</button>
    </div>
  )
}

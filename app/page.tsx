'use client'

import { useQuery,  } from "@tanstack/react-query"
import { ProgressBar } from "@/components/ProgressBar"
import { Tasks } from "@/components/Tasks"

import {getAllToDo} from '@/utils/axiosQueries'

export default function Home() {

  const {data:allToDo } = useQuery({
    queryKey: ['todos'],
    queryFn: getAllToDo,
  })

  return (
   <main className="flex w-screen min-h-screen justify-center items-center bg-[#D1D0D9] font-[Roboto]">
      <div className="flex flex-col w-[720px] min-h-[620px] bg-[#F5F5F5] rounded-2xl shadow-md py-[40px] px-[100px]">
       <ProgressBar todo={allToDo}/>
       <Tasks todo={allToDo} />
      </div>
   </main>
  )
}

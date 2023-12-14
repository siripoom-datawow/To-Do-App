import axios from "axios"
import { todoInterface } from "@/types/todo";

export const getAllToDo = async ():Promise<todoInterface[]> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/todos`)
  return response.data as todoInterface[];
}

export const createToDo = async (todo:todoInterface) =>{
  const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_HOST}/todos`, todo)
  return response.data as todoInterface;
}

export const updateMarkDoneToDo = async (todo:todoInterface):Promise<todoInterface> =>{
  const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_HOST}/todos/${todo.id}`, todo)
  return response.data as todoInterface;
}

export const deleteToDo = async (id:string) =>{
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_HOST}/todos/${id}`)
  return response.data 
}

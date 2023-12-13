import axios from "axios"
import { todoInterface } from "@/types/todo";

export const getAllToDo = async ():Promise<todoInterface[]> => {
  const response = await axios.get('http://127.0.0.1:3001/todos')
  return response.data as todoInterface[];
}

export const createToDo = async (todo:todoInterface) =>{
  const response = await axios.post('http://127.0.0.1:3001/todos', todo)
  return response.data as todoInterface;
}

import axios from '../core/axios'
import { todolistMapperFromApi, todolistMapperToApi, todolistsMapperFromApi } from './todolists.mapper'

export const getTodolists = async () => {
  const { data } = await axios.get('/todolists')

  return todolistsMapperFromApi(data)
}

export const getTodolist = async (id: string) => {
  const { data } = await axios.get(`/todolists/${id}`)

  return todolistMapperFromApi(data)
}

export const createTodolist = async (data: { title: string, description: string }) => {
  const dataToPost = todolistMapperToApi(data)

  const { data: response } = await axios.post('/todolists', dataToPost)

  return response
}

export const updateTodolist = async (id: string, data: { title: string, description: string }) => {
  const dataToPost = todolistMapperToApi(data)

  const { data: response } = await axios.patch(`/todolists/${id}`, dataToPost)

  return response
}

export const deleteTodolist = async (id: string) => {
  const { data } = await axios.delete(`/todolists/${id}`)

  return data
}
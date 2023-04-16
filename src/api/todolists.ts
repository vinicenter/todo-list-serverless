import axios from '../core/axios'
import { todolistsMapperFromApi } from './todolists.mapper'

export const getTodolists = async () => {
  const { data } = await axios.get('/todolists')

  return todolistsMapperFromApi(data)
}

export const deleteTodolist = async (id: string) => {
  const { data } = await axios.delete(`/todolists/${id}`)

  return data
}
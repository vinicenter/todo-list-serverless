import { todolistsAPI, todolistsMappedAPI } from './todolists.types';

export const todolistsMapperFromApi = (response: todolistsAPI.TodolistsResponseType): todolistsMappedAPI.TodolistsResponseType => {
  return {
    documents: response.documents.map((document) => ({
      id: document._id,
      title: document.title,
      description: document.description,
    })),
    error: response.error,
    isSuccess: response.isSuccess,
  }
}

export const todolistMapperFromApi = (response: todolistsAPI.TodolistResponseType): todolistsMappedAPI.TodolistResponseType => {
  return {
    document: {
      id: response.document._id,
      title: response.document.title,
      description: response.document.description,
    },
    error: response.error,
    isSuccess: response.isSuccess,
  }
}

export const todolistMapperToApi = (todolist: todolistsMappedAPI.TodolistPatchPostType): todolistsAPI.TodolistPatchPostType => {
  return {
    title: todolist.title,
    description: todolist.description,
  }
}

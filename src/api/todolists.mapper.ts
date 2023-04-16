import { todolistsAPI, todolistsMappedAPI } from './todolists.types';

export const todolistsMapperFromApi = (response: todolistsAPI.TodolistResponseType): todolistsMappedAPI.TodolistResponseType => {
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

export const todolistMapperDocumentToApi = (document: todolistsMappedAPI.TodolistType): todolistsAPI.TodolistType => {
  return {
    _id: document.id,
    title: document.title,
    description: document.description,
  }
}

export const todolistMapperDocumentFromApi = (document: todolistsAPI.TodolistType): todolistsMappedAPI.TodolistType => {
  return {
    id: document._id,
    title: document.title,
    description: document.description,
  }
}
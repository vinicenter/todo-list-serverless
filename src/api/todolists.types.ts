export namespace todolistsAPI {
  export interface TodolistPatchPostType {
    title: string;
    description: string;
  }

  export interface TodolistType {
    _id: string;
    title: string;
    description: string;
  }

  export interface TodolistsResponseType {
    documents: TodolistType[];
    error: boolean,
    isSuccess: boolean,
  }

  export interface TodolistResponseType {
    document: TodolistType;
    error: boolean,
    isSuccess: boolean,
  }
}

export namespace todolistsMappedAPI {
  export interface TodolistPatchPostType {
    title: string;
    description: string;
  }

  export interface TodolistType {
    id: string;
    title: string;
    description: string;
  }

  export interface TodolistsResponseType {
    documents: TodolistType[];
    error: boolean,
    isSuccess: boolean,
  }

  export interface TodolistResponseType {
    document: TodolistType;
    error: boolean,
    isSuccess: boolean,
  }
}
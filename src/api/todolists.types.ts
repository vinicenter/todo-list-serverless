export namespace todolistsAPI {
  export interface TodolistType {
    _id: string;
    title: string;
    description: string;
  }

  export interface TodolistResponseType {
    documents: TodolistType[];
    error: boolean,
    isSuccess: boolean,
  }
}

export namespace todolistsMappedAPI {
  export interface TodolistType {
    id: string;
    title: string;
    description: string;
  }

  export interface TodolistResponseType {
    documents: TodolistType[];
    error: boolean,
    isSuccess: boolean,
  }
}
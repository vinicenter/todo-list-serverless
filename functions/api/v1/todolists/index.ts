import { mongoInit } from "../utils/mongo-http";

export async function onRequestGet(context) {
  const db = mongoInit(context.env);

  const response = await db?.collection("todolists").find({ limit: 100 });

  return new Response(JSON.stringify(response));
}

export async function onRequestPost(context) {
  const newResObj = new Response(context.request.body);
  const body = await newResObj.json();

  const db = mongoInit(context.env);

  const todolist = await db?.collection("todolists").insertOne({
    title: body.title,
    description: body.description,
  });

  return new Response(JSON.stringify(todolist));
}

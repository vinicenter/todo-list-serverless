import { mongoInit } from "../core/utils/mongo-http";

export async function onRequestGet(context) {
  const { env, params } = context;
  const db = mongoInit(env);

  const response = await db?.collection("todolists").findOne({
    filter: {
      _id: { $oid: params.id },
    },
  });

  return new Response(JSON.stringify(response));
}

export async function onRequestDelete(context) {
  const { env, params } = context;
  const db = mongoInit(env);

  const response = await db?.collection("todolists").deleteOne({
    filter: {
      _id: { $oid: params.id },
    },
  });

  return new Response(JSON.stringify(response));
}

export async function onRequestPatch(context) {
  const { env, params, request } = context;
  const db = mongoInit(env);

  const newResObj = new Response(request.body);
  const body = await newResObj.json();

  const response = await db?.collection("todolists").updateOne({
    filter: {
      _id: { $oid: params.id },
    },
    update: {
      $set: {
        title: body.title,
        description: body.description,
      },
    },
  });

  return new Response(JSON.stringify(response));
}

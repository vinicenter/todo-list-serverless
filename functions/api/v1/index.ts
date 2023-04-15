import { mongoInit } from './utils/mongo-http';

export async function onRequest(context) {
    const db = mongoInit(context.env);

    db?.collection('articles').insertOne({ hello: 'world' });

    const response = await db?.collection('articles').find({ limit: 5 })

    return new Response(JSON.stringify(response))
}

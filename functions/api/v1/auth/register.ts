import bcrypt from 'bcryptjs'
import { mongoInit } from "../utils/mongo-http";
import jwt from '../utils/jwt'
import type { RegisterType } from './auth.schemas'
import { registerSafeParse } from './auth.schemas'

export async function onRequestPost(context) {
  const { env, request } = context;
  const db = mongoInit(env);
  const body = await new Response(request.body).json<RegisterType>();

  const registerParse = registerSafeParse(body)
  if (!registerParse.success) return new Response(registerParse.error.message, { status: 400 })

  const userExists = await db?.collection('users').findOne({ filter: { username: body.username } })
  if (userExists.document) return new Response('User already exists', { status: 409 })

  const criptoPassword = await bcrypt.hash(body.password, 10)

  const user = {
    username: body.username,
    password: criptoPassword
  }

  const result = await db?.collection('users').insertOne(user)
  if (result.error) return new Response(result, { status: 500 })

  const token = await jwt.sign({ id: result.insertedId }, env.JWT_SECRET)

  return new Response(JSON.stringify({ token, ...result }), { status: 200 })
}

import { mongoInit } from "../core/utils/mongo-http";
import jwt from '../core/utils/jwt'
import bcrypt from 'bcryptjs'
import type { LoginType } from './auth.schemas'
import { loginSafeParse } from './auth.schemas'

export async function onRequestPost(context) {
  const { env, request } = context;
  const db = mongoInit(env);
  const body = await new Response(request.body).json<LoginType>();

  const loginParse = loginSafeParse(body)
  if (!loginParse.success) return new Response(loginParse.error.message, { status: 400 })

  const user = await db?.collection('users').findOne({ filter: { username: body.username } })
  if (!user.document) return new Response('User not found', { status: 404 })

  const isPasswordValid = await bcrypt.compare(body.password, user.document.password)
  if (!isPasswordValid) return new Response('Invalid password', { status: 401 })

  const token = await jwt.sign({ id: user.document._id }, env.JWT_SECRET)
  return new Response(JSON.stringify({ token, ...user }), { status: 200 })
}

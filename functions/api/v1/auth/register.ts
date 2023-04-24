import type { RegisterType } from './auth.schemas'
import { registerSafeParse } from './auth.schemas'
import { User } from './models/user'
import jwt from '../core/utils/jwt'

export async function onRequestPost(context) {
  const { env, request } = context;
  const body = await new Response(request.body).json<RegisterType>();

  const registerParse = registerSafeParse(body)
  if (!registerParse.success) return new Response(registerParse.error.message, { status: 400 })

  const result = await User(context).createUser({
    username: body.username,
    password: body.password,
  })

  if (result.error) return new Response(JSON.stringify(result), { status: 500 })

  const token = await jwt.sign({ id: result.insertedId }, env.JWT_SECRET)
  return new Response(JSON.stringify({ token, ...result }), { status: 200 })
}

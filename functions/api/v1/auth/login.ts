import type { LoginType } from './auth.schemas'
import { loginSafeParse } from './auth.schemas'
import { User } from "./models/user";
import jwt from '../core/utils/jwt'

export async function onRequestPost(context) {
  const { env, request } = context;
  const { checkUserPassword, findOneUserByUsername } = User(context)

  const body = await new Response(request.body).json<LoginType>();

  const loginParse = loginSafeParse(body)
  if (!loginParse.success) return new Response(loginParse.error.message, { status: 400 })

  const isUserOrPasswordValid = await checkUserPassword(body.username, body.password)
  if (!isUserOrPasswordValid) {
    return new Response(JSON.stringify({ error: 'Invalid password or username' }), { status: 401 })
  }

  const user = await findOneUserByUsername(body.username)
  const token = await jwt.sign({ ...user.document }, env.JWT_SECRET)
  return new Response(JSON.stringify({ token, ...user }), { status: 200 })
}

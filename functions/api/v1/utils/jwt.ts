import jwt from '@tsndr/cloudflare-worker-jwt'
import type { JwtAlgorithm, JwtVerifyOptions, JwtPayload } from '@tsndr/cloudflare-worker-jwt'

const config = {
  exp: Math.floor(Date.now() / 1000 + (1 * (30 * 30)))
}

const sign = async (payload: JwtPayload, secret: string | JsonWebKey) => {
  console.log('payload', { ...payload, ...config })

  const token = await jwt.sign({ ...payload, ...config }, secret)
  return token
}

const verify = async (token: string, secret: string | JsonWebKey, options?: JwtVerifyOptions | JwtAlgorithm) => {
  console.log('verify', token, secret, options)

  const payload = await jwt.verify(token, secret, options)
  return payload
}

export default {
  sign,
  verify
}

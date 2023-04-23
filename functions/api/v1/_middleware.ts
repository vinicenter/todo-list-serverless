import jwt from './utils/jwt'

async function errorHandling(context) {
  try {
    return await context.next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}

async function authentication(context) {
  const publicRoutes = ['/api/v1/auth/login', '/api/v1/auth/register'];

  try {
    const { request, env, next } = context;
    const url = new URL(request.url);

    if (publicRoutes.includes(url.pathname)) return await next();

    const authorization = request.headers.get('Authorization');

    if (!authorization) return new Response('No token provided', { status: 401 });

    const tokenPrefix = authorization.split(' ')[0];
    const token = authorization.split(' ')[1];

    const isTokenValid = await jwt.verify(token, env.JWT_SECRET);

    if (tokenPrefix !== 'Bearer') return new Response('Invalid token', { status: 401 });
    if (!isTokenValid) return new Response('Invalid token', { status: 401 });

    return await next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}

export const onRequest = [errorHandling, authentication];
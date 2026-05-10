// lib/auth-helpers.ts
import { cookies } from 'next/headers';
import { authConfig } from './config';

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
  rememberMe = false
) {
  const cookieStore = await cookies();
  const accessMaxAge = rememberMe
    ? authConfig.accessToken.rememberMeMaxAge
    : authConfig.accessToken.defaultMaxAge;

  cookieStore.set('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    domain: 'localhost',
    maxAge: accessMaxAge
  });

  cookieStore.set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    domain: 'localhost',
    maxAge: authConfig.refreshToken.maxAge
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
}

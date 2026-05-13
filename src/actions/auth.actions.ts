'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { BASE_URL } from '@/lib/api-client';
import { setAuthCookies, clearAuthCookies } from '@/lib/auth-helpers';
import type { DtoLoginResponse } from '../services/-auth-login-post.schemas';
import type { DtoRegisterResponse } from '../services/-auth-register-post.schemas';
import type { DtoRefreshResponse } from '../services/-auth-refresh-post.schemas';

async function getCallbackUrlFromReferer(): Promise<string | null> {
  const headersList = await headers();
  const referer = headersList.get('referer');
  if (!referer) return null;
  try {
    const url = new URL(referer);
    return url.searchParams.get('callbackUrl');
  } catch {
    return null;
  }
}

async function handleAuthResponse<
  T extends {
    success?: boolean;
    message?: string;
    data?: { access_token?: string; refresh_token?: string };
  }
>(response: Response, json: T): Promise<{ error: string } | void> {
  if (!response.ok || !json.success) {
    return { error: json.message || 'Authentication failed' };
  }
  const { access_token, refresh_token } = json.data ?? {};
  if (!access_token || !refresh_token) {
    return { error: 'Invalid response from authentication server' };
  }
  await setAuthCookies(access_token, refresh_token);
  const callbackUrl = (await getCallbackUrlFromReferer()) || '/account';

  redirect(callbackUrl);
}

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const json = (await res.json()) as DtoLoginResponse;
  const error = await handleAuthResponse(res, json);
  if (error) return error;
}

export async function registerAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const phone = (formData.get('phone') as string) || undefined;

  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      phone
    })
  });

  const json = (await res.json()) as DtoRegisterResponse;
  const error = await handleAuthResponse(res, json);
  if (error) return error;
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (refreshToken) {
    try {
      await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken })
      });
    } catch {
      // ignore network errors – still clear local cookies
    }
  }

  await clearAuthCookies();
  redirect('/login');
}

export async function refreshAccessToken() {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) {
    return null;
  }

  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      refresh_token: refreshToken
    })
  });

  if (!res.ok) {
    return null;
  }

  const json = (await res.json()) as DtoRefreshResponse;

  const accessToken = json.data?.access_token || '';

  cookieStore.set('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });

  return accessToken;
}

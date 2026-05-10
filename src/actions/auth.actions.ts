// app/actions/auth.actions.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { DtoLoginResponse, DtoRegisterResponse } from '@/services/models';
import { BASE_URL } from '@/lib/api-client';
import { setAuthCookies, clearAuthCookies } from '@/lib/auth-helpers';

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
  redirect('/account');
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

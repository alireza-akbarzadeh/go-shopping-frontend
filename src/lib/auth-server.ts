// lib/auth-server.ts
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import type { DtoUserResponse } from '../services/-auth-login-post.schemas';

export interface UserPayload extends DtoUserResponse {
  exp: number;
}

/**
 * Returns the decoded user payload from the access_token cookie.
 * Returns null if no token or token is invalid/expired.
 * Use this in Server Components, Server Actions, or API routes.
 */
export async function getServerUser(): Promise<UserPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  if (!token) return null;

  try {
    const decoded = jwtDecode<UserPayload>(token);
    // Optional: check expiration
    if (decoded.exp && decoded.exp * 1000 < Date.now()) return null;
    return decoded;
  } catch {
    return null;
  }
}

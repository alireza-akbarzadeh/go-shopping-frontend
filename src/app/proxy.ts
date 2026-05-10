// proxy.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface RefreshResponse {
  success: boolean;
  message?: string;
  data: {
    access_token: string;
    refresh_token?: string;
  };
}

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;

  const { pathname } = request.nextUrl;

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const isPublicPath = pathname === '/login' || pathname === '/register';
  if (isPublicPath) {
    return NextResponse.next();
  }

  // If no access token, try to refresh it
  if (!accessToken && refreshToken) {
    const refreshRes = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken })
    });

    if (refreshRes.ok) {
      const json = (await refreshRes.json()) as RefreshResponse;
      const newAccessToken = json.data.access_token;

      const response = NextResponse.next();
      response.cookies.set('access_token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      });
      return response;
    }

    // Refresh failed → clear cookies and redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
    return response;
  }

  // If we have an access token (or no refresh token exists), continue normally
  return NextResponse.next();
}

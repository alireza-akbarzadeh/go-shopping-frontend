// middleware.ts

import { NextRequest, NextResponse } from 'next/server';

const PUBLIC = ['/login', '/register', '/'];

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;

  console.log(`Middleware: ${req.nextUrl.pathname}, token: ${token ? 'present' : 'absent'}`);

  const isPublic = PUBLIC.includes(req.nextUrl.pathname);

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};

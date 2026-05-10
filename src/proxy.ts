// proxy.ts

import { NextRequest, NextResponse } from 'next/server';

const PUBLIC = ['/login', '/register', '/'];

export function proxy(req: NextRequest) {
  const token = req.cookies.get('access_token');

  const isPublic = PUBLIC.includes(req.nextUrl.pathname);

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

import { NextRequest, NextResponse } from 'next/server';

const PUBLIC = ['/login', '/register', '/', '/shop'];

export function proxy(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;
  const { pathname, search } = req.nextUrl;

  const isPublic = PUBLIC.includes(pathname);

  if (!token && !isPublic) {
    const originalUrl = `${pathname}${search}`;
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', originalUrl);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};

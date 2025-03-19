import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = req.cookies.get('token');
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/select-platform',
    '/about-yourself',
    '/link-ready',
    '/select-template',
    '/add-links',
    '/profile-details',
    '/analytics',
    '/edit-profile',
    '/appearance',
  ],
};

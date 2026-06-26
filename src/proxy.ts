import { auth } from '../lib/auth/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


const neonMiddleware = auth.middleware({
  // Redirects unauthenticated users to sign-in page
  loginUrl: '/auth/sign-up',
});

export default async function proxy(request: NextRequest) {
  // Server action POST requests include a 'next-action' header.
  // The Neon auth middleware consumes the request body during session
  // validation, which destroys the server action payload.
  // Skip auth middleware for server actions — auth should be verified
  // inside each server action instead (per Next.js security docs).
 
  console.log("Middleware hit:", request.nextUrl.pathname);

  if (request.nextUrl.pathname.startsWith("/api")){
    return NextResponse.next();
  }
  
  if (request.headers.get('next-action')) {
    return NextResponse.next();
  }
  return neonMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
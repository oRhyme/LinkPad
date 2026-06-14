import { auth } from '../lib/auth/server';

export default auth.middleware({
  // Redirects unauthenticated users to sign-in page
  loginUrl: '/auth/sign-up',
});

export const config = {
  matcher: [
    '/:path*',
    // Protected routes requiring authentication
    // '/account/:path*',
  ],
};
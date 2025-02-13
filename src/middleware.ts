import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

// Original middleware config
/*
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
*/

// New config - handle API routes and pages while excluding static files
export const config = {
  matcher: [
    '/api/:path*',
  '/trpc/:path*',
  '/clients/:path*',
  '/data/:path*',
  '/alerts/:path*',
  '/documents/:path*'
  ],
}

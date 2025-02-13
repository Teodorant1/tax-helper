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

// Simplified config - only handle API routes
export const config = {
  matcher: ['/(api|trpc)(.*)'],
}

import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_PATHS = ['/admin']
const PUBLIC_PATHS = ['/admin/login', '/admin/create-first-user']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Block /edit routes from indexing
  if (pathname.startsWith('/admin/puck')) {
    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    return response
  }

  // Payload admin — Payload handles its own auth, just pass through
  if (pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // API routes — no-store for all dynamic endpoints
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next()
    if (!pathname.includes('/api/og')) {
      response.headers.set('Cache-Control', 'no-store')
    }
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

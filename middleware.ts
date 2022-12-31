import { NextRequest, NextResponse } from 'next/server'

const protectedPages = ['/', '/library', '/playlist']

export default function middleware(req: NextRequest) {
  if (protectedPages.find((p) => p === req.nextUrl.pathname)) {
    // req is a NextRequest, not a NextAPIRequest and the req.cookies is different
    const token = req.cookies.get(process.env.USER_ACCESS_COOKIE)
    if (!token) {
      return NextResponse.redirect(new URL('/signin', req.url))
    }
  }
}

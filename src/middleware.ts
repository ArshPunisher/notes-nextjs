import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from './app/utils/isAuthenticated'

export async function middleware(request: NextRequest){
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/login' || path === '/register'

  const userInfo = await isAuthenticated(request)

  if(!isPublicPath && !userInfo){
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if(isPublicPath && userInfo){
    return NextResponse.redirect(new URL('/', request.url))
  }

}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register'
  ]
}
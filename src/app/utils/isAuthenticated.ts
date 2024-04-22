import * as jose from 'jose'
import { NextRequest } from 'next/server'

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.SECRET),
}

export const isAuthenticated = async (request: NextRequest) => {
  let token = request.cookies.get('token')?.value || ''
  if (token) {
    try {
      const decoded = await jose.jwtVerify(token, jwtConfig.secret)
      if (decoded.payload?._id) {
        return decoded.payload._id
      } else {
        return false
      }
    } catch (err) {
      console.error('isAuthenticated error: ', err)
      return false
    }
  } else {
    return false
  }
}
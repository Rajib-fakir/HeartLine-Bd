// middleware.js
import { NextResponse } from 'next/server';

const allowedOrigin = '*';

export function middleware(request) {
  const response = NextResponse.next();

  response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: response.headers,
    });
  }

  return response;
}

export const config = {
  matcher: ['/api/:path*'], // শুধু /api/** রাউটে middleware চলবে
};
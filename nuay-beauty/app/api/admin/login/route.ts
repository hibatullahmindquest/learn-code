import { NextRequest, NextResponse } from 'next/server';
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  isAuthedRequest,
  verifyAdminPassword,
} from '@/lib/adminSession';
import { isRateLimited } from '@/lib/rateLimit';

const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

function clientKey(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ authed: isAuthedRequest(request) });
}

export async function POST(request: NextRequest) {
  if (isRateLimited(`login:${clientKey(request)}`, LOGIN_LIMIT, LOGIN_WINDOW_MS)) {
    return NextResponse.json({ error: 'Terlalu banyak percubaan. Cuba lagi dalam 15 minit.' }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const password = body?.password;
  if (typeof password !== 'string' || !verifyAdminPassword(password)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(SESSION_COOKIE);
  return res;
}

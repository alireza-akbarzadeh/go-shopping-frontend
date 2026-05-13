import { NextResponse } from 'next/server';
import { refreshAccessToken } from '~/src/actions/auth.actions';

export async function POST() {
  const newToken = await refreshAccessToken();
  if (!newToken) {
    return NextResponse.json({ error: 'Refresh failed' }, { status: 401 });
  }
  return NextResponse.json({ access_token: newToken });
}

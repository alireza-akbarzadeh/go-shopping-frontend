'use server';

import { getServerUser } from '@/lib/auth-server';

export async function getClientUser() {
  return await getServerUser();
}

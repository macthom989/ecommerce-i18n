'use server';

import { cookies } from 'next/headers';
import { Locale } from '@/i18n/config';
import { revalidatePath } from 'next/cache';

const COOKIE_NAME = 'NEXT_LOCALE';

export async function updateLocale(locale: Locale, path: string) {
  (await cookies()).set(COOKIE_NAME, locale, {
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  // Revalidate the current path to reflect the new locale
  revalidatePath(path);

  return { success: true };
}

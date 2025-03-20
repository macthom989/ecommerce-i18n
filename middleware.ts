import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/i18n/config';

const COOKIE_NAME = 'NEXT_LOCALE';

export function middleware(request: NextRequest) {
  // Check if there is a locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  // Get the locale from cookie
  const cookieLocale = request.cookies.get(COOKIE_NAME)?.value;
  const locale = cookieLocale || defaultLocale;

  // Redirect if there is no locale in the pathname
  if (!pathnameHasLocale) {
    // Create a new URL with the locale
    const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);

    // Copy all searchParams
    request.nextUrl.searchParams.forEach((value, key) => {
      newUrl.searchParams.set(key, value);
    });

    // Return a redirect response
    return NextResponse.redirect(newUrl);
  }

  // Extract the locale from the pathname
  const pathLocale = pathname.split('/')[1];

  // If the cookie locale doesn't match the path locale, update the cookie
  if (cookieLocale !== pathLocale && locales.includes(pathLocale as any)) {
    const response = NextResponse.next();
    response.cookies.set(COOKIE_NAME, pathLocale, {
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Match all request paths except for:
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  // - public folder files (e.g. robots.txt)
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)|manifest.json|sw.js|worker-register.js|offline.html).*)',
  ],
};

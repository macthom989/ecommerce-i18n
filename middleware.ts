import createMiddleware from "next-intl/middleware"
import { locales, defaultLocale } from "@/lib/i18n"

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
})

export const config = {
  // Match all pathnames except for
  // - files with extensions (e.g., images)
  // - API routes
  // - _next paths (Next.js internals)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}


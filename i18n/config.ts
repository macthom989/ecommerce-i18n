export type Locale = (typeof locales)[number];

export const locales = ['en', 'vi','ar','de','es','he','tr','zh'] as const;
export const defaultLocale: Locale = 'en';

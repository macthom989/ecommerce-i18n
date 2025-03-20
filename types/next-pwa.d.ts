declare module 'next-pwa' {
  import type { NextConfig } from 'next';

  interface PWAConfig {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    scope?: string;
    sw?: string;
    skipWaiting?: boolean;
    runtimeCaching?: any[];
    buildExcludes?: Array<string | RegExp>;
    dynamicStartUrl?: boolean;
    fallbacks?: {
      [key: string]: string;
    };
  }

  type WithPWAOptions = NextConfig & {
    pwa?: PWAConfig;
  };

  function withPWA(config: WithPWAOptions): NextConfig;

  export = withPWA;
}

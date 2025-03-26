import { set } from './../../../../lib/local-storage';
import { NextResponse } from 'next/server';
import { fetchFn } from '@/lib/fetcher';

export const revalidate = 60;

export async function GET() {
  const settingUrl = `/wp-json/hvcore-settings/v1/get`;
  const settingResponse = await fetchFn('GET', settingUrl);
  const setting = await settingResponse.data;

  const settingConst = {
    site_name: setting.site_name || 'Hv Theme',
    name: setting.name || 'Hv Theme',
    description:
      setting.description ||
      'Fastest E-commerce template built with React, NextJS, TypeScript, @tanstack/react-query and Tailwind CSS.',
    author: setting.author || 'REDQ',
    logo: {
      ...setting.logo,
      alt: '',
      href: '/',
      width: 95,
      height: 30,
    },
    defaultLanguage: setting.defaultLanguage || 'en',
    currencyCode: setting.currencyCode || 'USD',
    themeType: setting.themeType || 'light',
    menus: setting.menus[0].items || [],
    site_header: {
      menu: 20,
      mobileMenu: 20,
      languageMenu: 'en',
      categoryMenu: [],
      pagesMenu: [],
    },
    banners: [
      {
        id: 1,
        title: "Men's Collection",
        slug: 'mens-collection',
        image: {
          mobile: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-mobile-1.jpg',
            width: 470,
            height: 232,
          },
          desktop: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-1.jpg',
            width: 1078,
            height: 425,
          },
        },
        type: 'medium',
      },
      {
        id: 2,
        title: "Men's Collection",
        slug: 'mens-collection',
        image: {
          mobile: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-mobile-2.jpg',
            width: 232,
            height: 232,
          },
          desktop: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-2.jpg',
            width: 425,
            height: 425,
          },
        },
        type: 'small',
      },
      {
        id: 3,
        title: "Men's Collection",
        slug: 'mens-collection',
        image: {
          mobile: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-mobile-3.jpg',
            width: 232,
            height: 232,
          },
          desktop: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-3.jpg',
            width: 425,
            height: 425,
          },
        },
        type: 'small',
      },
      {
        id: 4,
        title: "Men's Collection",
        slug: 'mens-collection',
        image: {
          mobile: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-mobile-4.jpg',
            width: 232,
            height: 232,
          },
          desktop: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-4.jpg',
            width: 425,
            height: 425,
          },
        },
        type: 'small',
      },
      {
        id: 5,
        title: "Men's Collection",
        slug: 'mens-collection',
        image: {
          mobile: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-mobile-5.jpg',
            width: 232,
            height: 232,
          },
          desktop: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-5.jpg',
            width: 425,
            height: 425,
          },
        },
        type: 'small',
      },

      {
        id: 6,
        title: "Men's Collection",
        slug: 'mens-collection',
        image: {
          mobile: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-mobile-6.jpg',
            width: 470,
            height: 232,
          },
          desktop: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-6.jpg',
            width: 1078,
            height: 425,
          },
        },
        type: 'medium',
      },
    ],
    bannersStandard: [
      {
        id: 1,
        title: "Men's Collection",
        slug: 'mens-collection',
        image: {
          mobile: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/hero-banner-3.jpg',
            width: 1920,
            height: 900,
          },
          desktop: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/hero-banner-3.jpg',
            width: 1920,
            height: 900,
          },
        },
        type: 'medium',
      },
    ],
    flash_sale_categories: [22],
    flash_sale_time_type: 'from-to',
    flash_sale_loop_hours: 10,
    flash_sale_category: 15,
    flash_sale_start_time: '17:00',
    flash_sale_end_time: '20:00',
    flash_sale_end_time_block: '2025-03-30T01:02:03',
  };
  return NextResponse.json(settingConst, { status: 200 });
}

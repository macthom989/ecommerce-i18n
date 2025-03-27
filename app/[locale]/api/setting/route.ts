import { NextResponse } from 'next/server';
import { fetchFn } from '@/lib/fetcher';

export const revalidate = 60;

const banner = {
  Modern: {
    BannerBlock: [
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
    BannerSliderBlock: [
      {
        id: 1,
        title: 'Travel Baggage',
        slug: 'travel-baggage',
        image: {
          mobile: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-3-5.jpg',
            width: 450,
            height: 180,
          },
          desktop: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-3-4.jpg',
            width: 1440,
            height: 570,
          },
        },
        type: 'small',
      },
      {
        id: 2,
        title: "Women's Collection",
        slug: "women's-collection",
        image: {
          mobile: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-2-5.jpg',
            width: 450,
            height: 180,
          },
          desktop: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-2-4.jpg',
            width: 1440,
            height: 570,
          },
        },
        type: 'small',
      },
      {
        id: 3,
        title: 'Winter Collection',
        slug: 'winter-collection',
        image: {
          mobile: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-1-4.jpg',
            width: 450,
            height: 180,
          },
          desktop: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-1-3.jpg',
            width: 1440,
            height: 570,
          },
        },
        type: 'small',
      },
      {
        id: 4,
        title: "Women's Collection",
        slug: "women's-collection",
        image: {
          mobile: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-2-5.jpg',
            width: 450,
            height: 180,
          },
          desktop: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-2-4.jpg',
            width: 1440,
            height: 570,
          },
        },
        type: 'small',
      },
    ],
    BannerCard: [
      {
        id: 1,
        title: 'Winter Collection of Kid Items',
        slug: 'winter-collection',
        image: {
          mobile: {
            // url: '/assets/images/banner/banner-mobile-3.jpg',
            url: '/assets/images/banner/banner-3.jpg',
            width: 450,
            height: 180,
          },
          desktop: {
            url: '/assets/images/banner/banner-3.jpg',
            width: 1800,
            height: 570,
          },
        },
      },
      {
        id: 2,
        title: 'Offer Off Everything',
        slug: 'offer-everything',
        image: {
          mobile: {
            url: '/assets/images/banner/banner-mobile-4.jpg',
            width: 450,
            height: 130,
          },
          desktop: {
            url: '/assets/images/banner/banner-4.jpg',
            width: 1800,
            height: 420,
          },
        },
      },
    ],
    ExclusiveBlock: {
      exclusiveName: 'text-new-year',
      year: 2021,
      exclusiveData: [
        {
          id: 1,
          slug: '/search',
          buttonText: 'button-women-exclusive',
          image: '/assets/images/exclusive/women.png',
          backgroundColor: 'bg-gray-150',
        },
        {
          id: 2,
          slug: '/search',
          buttonText: 'button-men-exclusive',
          image: '/assets/images/exclusive/men.png',
          backgroundColor: 'bg-linenSecondary',
        },
      ],
    },
    DownloadApps: {
      title: 'app-heading',
      subTitle: 'app-sub-heading',
      appImage: '/assets/images/app.png',
      appImage2: '/assets/images/app2.png',
      appImage3: '/assets/images/app3.png',
      appButtons: [
        {
          id: 1,
          slug: '/',
          altText: 'button-app-store',
          appButton: '/assets/images/app-store.svg',
          buttonWidth: 209,
          buttonHeight: 60,
        },
        {
          id: 2,
          slug: '/',
          altText: 'button-play-store',
          appButton: '/assets/images/play-store.svg',
          buttonWidth: 209,
          buttonHeight: 60,
        },
      ],
    },
    HeroBlock: [
      {
        id: 1,
        title: 'winter collection',
        slug: 'winter-collection',
        image: {
          mobile: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-mobile-1-1.jpg',
            width: 480,
            height: 275,
          },
          desktop: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-1-1.jpg',
            width: 1800,
            height: 800,
          },
        },
      },
      {
        id: 2,
        title: 'gift collection',
        slug: 'gift-collection',
        image: {
          mobile: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-mobile-2-1.jpg',
            width: 480,
            height: 275,
          },
          desktop: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-2-1.jpg',
            width: 1800,
            height: 800,
          },
        },
      },
      {
        id: 3,
        title: 'party collection',
        slug: 'party-collection',
        image: {
          mobile: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-mobile-3-1.jpg',
            width: 480,
            height: 275,
          },
          desktop: {
            url: 'https://moccasin-aardvark-454600.hostingersite.com/wp-content/uploads/2025/03/banner-3-1.jpg',
            width: 1800,
            height: 800,
          },
        },
      },
    ],
  },
};

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
    author: setting.author || 'Hv Theme',
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
    bannerTheme: banner[setting.themeType],
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

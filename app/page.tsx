import BannerBlock from '@/components/banner/banner-block';

export default async function Home() {
  const homeThreeMasonryBanner = [
    {
      id: 1,
      title: "Men's Collection",
      slug: 'mens-collection',
      image: {
        mobile: {
          url: '/assets/images/banner/masonry/banner-mobile-1.jpg',
          width: 470,
          height: 232,
        },
        desktop: {
          url: '/assets/images/banner/masonry/banner-1.jpg',
          width: 1078,
          height: 425,
        },
      },
      type: 'medium',
    },
    {
      id: 2,
      title: 'New Sports',
      slug: 'new-sports',
      image: {
        mobile: {
          url: '/assets/images/banner/masonry/banner-mobile-2.jpg',
          width: 232,
          height: 232,
        },
        desktop: {
          url: '/assets/images/banner/masonry/banner-2.jpg',
          width: 425,
          height: 425,
        },
      },
      type: 'small',
    },
    {
      id: 3,
      title: 'Dress Women',
      slug: 'dress-women',
      image: {
        mobile: {
          url: '/assets/images/banner/masonry/banner-mobile-3.jpg',
          width: 232,
          height: 232,
        },
        desktop: {
          url: '/assets/images/banner/masonry/banner-3.jpg',
          width: 425,
          height: 425,
        },
      },
      type: 'small',
    },
    {
      id: 4,
      title: 'Exclusive Sunglasses',
      slug: 'exclusive-sunglasses',
      image: {
        mobile: {
          url: '/assets/images/banner/masonry/banner-mobile-4.jpg',
          width: 232,
          height: 232,
        },
        desktop: {
          url: '/assets/images/banner/masonry/banner-4.jpg',
          width: 425,
          height: 425,
        },
      },
      type: 'small',
    },
    {
      id: 5,
      title: 'Product Coupons',
      slug: 'product-coupons',
      image: {
        mobile: {
          url: '/assets/images/banner/masonry/banner-mobile-5.jpg',
          width: 232,
          height: 232,
        },
        desktop: {
          url: '/assets/images/banner/masonry/banner-5.jpg',
          width: 425,
          height: 425,
        },
      },
      type: 'small',
    },
    {
      id: 6,
      title: 'New Backpack',
      slug: 'new-backpack',
      image: {
        mobile: {
          url: '/assets/images/banner/masonry/banner-mobile-6.jpg',
          width: 470,
          height: 232,
        },
        desktop: {
          url: '/assets/images/banner/masonry/banner-6.jpg',
          width: 1078,
          height: 425,
        },
      },
      type: 'medium',
    },
  ];
  return <BannerBlock data={homeThreeMasonryBanner} />;
}

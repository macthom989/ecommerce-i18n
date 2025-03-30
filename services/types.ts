import { QueryKey } from '@tanstack/react-query';

export type CollectionsQueryOptionsType = {
  text?: string;
  collection?: string;
  status?: string;
  limit?: number;
};

export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
  demoVariant?: 'ancient';
};
export type ProductsQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type QueryOptionsType = {
  slug?: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
  demoVariant?: 'ancient';
};

export type ShopsQueryOptionsType = {
  text?: string;
  shop?: Shop;
  status?: string;
  limit?: number;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};
export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
  src?: string;
};
export type Category = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  count?: number;
};
export type TagWoo = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

export type Collection = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};
export type Brand = {
  id: number | string;
  name: string;
  slug: string;
  image?: Attachment;
  background_image?: any;
  [key: string]: unknown;
};
export type Tag = {
  id: string | number;
  name: string;
  slug: string;
};
export type Product = {
  id: number | string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  sale_price?: number;
  images: Attachment;
  sku?: string;
  gallery?: Attachment[];
  category?: Category;
  tag?: Tag[];
  tags?: Tag[];
  meta?: any[];
  description?: string;
  short_description?: string;
  variations?: object;
  [key: string]: unknown;
  isNewArrival?: boolean;
  sold?: number;
};
export type OrderItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};
export type Order = {
  id: string | number;
  name: string;
  slug: string;
  products: OrderItem[];
  total: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  shipping_fee: number;
  payment_gateway: string;
};

export type Shop = {
  id: string | number;
  owner_id: string | number;
  owner_name: string;
  address: string;
  phone: string;
  website: string;
  ratings: string;
  name: string;
  slug: string;
  description: string;
  cover_image: Attachment;
  logo: Attachment;
  socialShare: any;
  created_at: string;
  updated_at: string;
};

export type SearchDataProduct = {
  count: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
  data: Product[];
};

export type SVGIconProps = React.SVGAttributes<SVGElement>;
export type AnchorProps = React.HTMLAttributes<HTMLAnchorElement>;

/* Post Api Type */

export interface BlogRendered {
  rendered: string;
  protected?: boolean;
}

export interface PostAuthor {
  id: number;
  name: string;
  avatar_urls?: {
    [key: string]: string;
  };
}

export interface PostWpTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface Post {
  id: number;
  date: string;
  date_gmt: string;
  guid: BlogRendered;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: BlogRendered;
  content: BlogRendered;
  excerpt: BlogRendered;
  author: number | BlogRendered;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: Record<string, any>;
  categories: number[];
  tags: number[];
  class_list: string[];
  acf: Record<string, any>;
  yoast_head?: string;
  yoast_head_json?: {
    title: string;
    description?: string;
    og_title?: string;
    og_description?: string;
    og_image?: {
      url: string;
    }[];
    twitter_card?: string;
    [key: string]: any;
  };
  _links: {
    self: { href: string; targetHints?: { allow: string[] } }[];
    collection: { href: string }[];
    about: { href: string }[];
    author: { embeddable: boolean; href: string }[];
    replies: { embeddable: boolean; href: string }[];
    [key: string]: any;
  };
  _embedded?: {
    author?: PostAuthor[];
    'wp:featuredmedia'?: {
      id: number;
      source_url: string;
      alt_text?: string;
      media_details?: {
        width: number;
        height: number;
        sizes?: {
          [key: string]: {
            source_url: string;
            width: number;
            height: number;
          };
        };
      };
    }[];
    'wp:term'?: PostWpTerm[][];
  };
}

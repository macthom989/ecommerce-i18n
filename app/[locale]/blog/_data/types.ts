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

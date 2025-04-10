// import { Post, PostCategory } from '@services/types';
// import { fetchFn } from '@lib/fetcher';
// import { NextResponse } from 'next/server';
//
// async function GET(_: Request, { params }: { params: { slug: string } }) {
//   const { slug } = params;
//
//   try {
//     // First: Get category by slug
//     const { data } = await fetchFn<PostCategory[]>('GET', `/wp-json/wp/v2/categories?slug=${slug}`);
//
//     if (!data?.length) {
//       return NextResponse.json({ error: 'Category not found' }, { status: 404 });
//     }
//     const categoryId = data[0].id;
//
//     // Second: Get posts by category ID
//     const { data: posts } = await fetchFn<Post[]>('GET', `/wp-json/wp/v2/posts?categories=${categoryId}`);
//
//     return NextResponse.json(posts);
//   } catch (error) {
//     console.error('Error fetching posts by category slug:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }
// //
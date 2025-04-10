import { NextRequest, NextResponse } from 'next/server';
import { fetchFn } from '@lib/fetcher';
import { PostCategory } from '@services/types';

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const { data } = await fetchFn<PostCategory[]>('GET', `/wp-json/wp/v2/categories?slug=${slug}`);

    if (!data?.length) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

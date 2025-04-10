import { NextResponse } from 'next/server';
import { fetchFn } from '@lib/fetcher';
import { PostCategory } from '@services/types';

export async function GET() {
  // hide_empty=true
  const endpointUrl = '/wp-json/wp/v2/categories?per_page=100';
  const { data } = await fetchFn<PostCategory[]>('GET', endpointUrl, {
    next: { revalidate: 60 }, // ISR: cache 60s
  });
  return NextResponse.json(data);
}

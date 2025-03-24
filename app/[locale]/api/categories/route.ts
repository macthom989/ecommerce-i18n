import { NextResponse } from 'next/server';
import data from '@api/categories.json'; // Import JSON
import { fetchFn } from '@/lib/fetcher-local';

export async function GET() {
  const categoryUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/wc/v3/products/categories`;
  const categoryResponse = await fetchFn('GET', categoryUrl);
  return NextResponse.json(categoryResponse.data);
}

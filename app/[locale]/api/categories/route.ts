import { NextResponse } from 'next/server';
import data from '@api/categories.json'; // Import JSON
import { fetchFn } from '@/lib/fetcher';

export async function GET() {
  const categoryUrl = `/wp-json/wc/v3/products/categories`;
  const categoryResponse = await fetchFn('GET', categoryUrl);
  return NextResponse.json(categoryResponse.data);
}

import { NextResponse } from 'next/server';
import data from '@api/brands.json'; // Import JSON
import { fetchFn } from '@/lib/fetcher';

export async function GET() {
  const res = await fetchFn('GET', `/wp-json/wc/v3/products/brands`);
  const brands = await res.data;
  return NextResponse.json(brands);
}

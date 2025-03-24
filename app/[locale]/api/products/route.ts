import { fetchFn } from '@/lib/fetcher';
import { NextResponse } from 'next/server';

export async function GET() {
  const productsResponse = await fetchFn('GET', `/wp-json/wc/v3/products`);
  return NextResponse.json(productsResponse.data, { status: 200 });
}

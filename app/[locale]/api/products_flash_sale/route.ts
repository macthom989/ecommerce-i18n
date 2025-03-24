import { fetchFn } from '@/lib/fetcher';
import { NextResponse } from 'next/server';

export async function GET() {
  const idCategory = 22;
  const products = `/wp-json/wc/v3/products?category=${idCategory}`;
  const settingResponse = await fetchFn('GET', products);
  const productsResponse = await settingResponse.data;
  return NextResponse.json(productsResponse);
}

import { NextResponse } from 'next/server';
import { fetchFn } from '@lib/fetcher';
import { Product } from '@services/types';

export async function GET() {
  const idCategory = 22;
  const endpoint = `/wp-json/wc/v3/products?category=${idCategory}`;

  try {
    const { data } = await fetchFn<Product[]>('GET', endpoint);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Failed to fetch products' }, { status: 500 });
  }
}

import { fetchFn } from '@/lib/fetcher';
import { NextResponse } from 'next/server';
import { Product } from '@services/types';

export async function GET() {
  const endpoint = `/wp-json/wc/v3/products`;
  try {
    const { data } = await fetchFn<Product[]>('GET', endpoint);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Failed to fetch products' }, { status: 500 });
  }
}

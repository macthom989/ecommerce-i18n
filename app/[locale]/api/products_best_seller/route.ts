import { fetchFn } from '@/lib/fetcher-local';
import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@services/types';

export async function GET(req: NextRequest) {
  const endpoint = `/wp-json/wc/v3/products`;
  try {
    const { success, data, message } = await fetchFn<Product[]>('GET', endpoint);
    if (!success) {
      console.error('WooCommerce API Error:', message);
      return NextResponse.json({ success: false, message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Failed to fetch products' }, { status: 500 });
  }
}

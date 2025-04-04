import { NextResponse } from 'next/server';
import { fetchFn } from '@/lib/fetcher';

export const revalidate = 60;

type paramsType = Promise<{ slug: string }>;

export async function GET(req: Request, { params }: { params: paramsType }) {
  const { slug } = await params;
  const orderUrl = `/wp-json/wc/v3/orders/${slug}`;
  const orderResponse = await fetchFn('GET', orderUrl);
  const order = await orderResponse.data;
  return NextResponse.json(order, { status: 200 });
}

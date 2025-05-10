import { NextResponse } from 'next/server';
import { fetchFn } from '@/lib/fetcher';

export const revalidate = 60;

type paramsType = Promise<{ slug: string }>;
export async function GET(req: Request, { params }: { params: paramsType }) {
  const { slug } = await params;
  const searchUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/wc/v3/products?slug=${slug}`;
  const searchResponse = await fetchFn('GET', searchUrl);
  const products = await searchResponse.data;
  const productId = products[0].id;
  const productUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/wc/v3/products/${productId}`;
  const productResponse = await fetchFn('GET', productUrl);
  const product = await productResponse.data;
  return NextResponse.json(product, { status: 200 });
}

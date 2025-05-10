import { NextResponse } from 'next/server';
import { fetchFn } from '@/lib/fetcher';

type ParamsType = Promise<{ slug: string }>;

export async function GET(req: Request, { params }: { params: ParamsType }) {
  const { slug } = await params;
  const searchParams = new URL(req.url).searchParams;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('per_page') || '10', 10);

  const tagUrl = `/wp-json/wc/v3/products/tags?slug=${slug}`;
  const tagResponse = await fetchFn('GET', tagUrl);

  if (!tagResponse.data || tagResponse.data.length === 0) {
    return NextResponse.json({ error: 'Tag not found' }, { status: 404 });
  }

  const tag = tagResponse.data.find((t: any) => t.slug === slug);
  if (!tag) {
    return NextResponse.json({ error: 'Tag not found' }, { status: 404 });
  }

  const countResponse = await fetchFn('GET', `/wp-json/wc/v3/products?tag=${tag.id}&per_page=1`);
  const totalCount = parseInt(countResponse.headers?.['x-wp-total'] || '0', 10);

  if (totalCount === 0) {
    return NextResponse.json({ message: `No products found`, count: 0, products: [] }, { status: 200 });
  }

  const productsUrl = `/wp-json/wc/v3/products?tag=${tag.id}&per_page=${perPage}&page=${page}`;
  const productsResponse = await fetchFn('GET', productsUrl);

  return NextResponse.json(
    {
      count: totalCount,
      currentPage: page,
      perPage,
      totalPages: Math.ceil(totalCount / perPage),
      products: productsResponse.data,
    },
    { status: 200 },
  );
}

import { NextResponse } from 'next/server';
import { fetchFn } from '@/lib/fetcher';

type ParamsType = Promise<{ slug: string }>;

export async function GET(req: Request, { params }: { params: ParamsType }) {
  const { slug } = await params;
  const searchParams = new URL(req.url).searchParams;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('per_page') || '10', 10);

  const categoryUrl = `/wp-json/wc/v3/products/categories?slug=${slug}`;
  const categoryResponse = await fetchFn('GET', categoryUrl);

  if (!categoryResponse.data || categoryResponse.data.length === 0) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  const category = categoryResponse.data.find((cat: any) => cat.slug === slug);
  if (!category) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  const countResponse = await fetchFn('GET', `/wp-json/wc/v3/products?category=${category.id}&per_page=1`);
  const totalCount = parseInt(countResponse.headers?.['x-wp-total'] || '0', 10);

  if (totalCount === 0) {
    return NextResponse.json({ message: `No products found`, count: 0, products: [] }, { status: 200 });
  }

  const productsUrl = `/wp-json/wc/v3/products?category=${category.id}&per_page=${perPage}&page=${page}`;
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

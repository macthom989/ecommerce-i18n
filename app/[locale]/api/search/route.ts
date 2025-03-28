import { fetchFn } from '@/lib/fetcher';
import { NextResponse } from 'next/server';
import { Product } from '@services/types';

async function fetchCategories() {
  const endpoint = `/wp-json/wc/v3/products/categories?per_page=100`;
  const response = await fetchFn<{ id: number; slug: string }[]>('GET', endpoint);
  return response.data;
}

async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const params = new URLSearchParams();

  const searchText = searchParams.get('text');
  if (searchText) params.set('search', searchText);

  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('per_page') || '10', 10);
  params.set('per_page', perPage.toString());
  params.set('page', page.toString());

  if (searchParams.has('category')) {
    const categorySlugs = searchParams.get('category')?.split(',') || [];
    const categories = (await fetchCategories()) ?? [];

    const categoryIds = categorySlugs
      .map((slug) => {
        const category = categories.find((c) => c.slug === slug);
        return category ? category.id : undefined;
      })
      .filter((id) => id !== undefined);

    if (categoryIds.length > 0) {
      params.set('category', categoryIds.join(','));
    }
  }

  if (searchParams.has('brand')) {
    params.set('brand', searchParams.get('brand')!);
  }

  if (searchParams.has('price')) {
    const priceRanges = searchParams.get('price')?.split(',') || [];

    priceRanges.forEach((range) => {
      const [min, max] = range.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        params.set('min_price', min.toString());
        params.set('max_price', max.toString());
      }
    });
  }

  if (searchParams.has('color')) {
    params.set('attribute', 'pa_color'); // Giả sử color là attribute
    params.set('attribute_term', searchParams.get('color')!);
  }

  const endpoint = `/wp-json/wc/v3/products?${params.toString()}`;
  const response = await fetchFn<Product[]>('GET', endpoint);

  const totalCount = response.headers?.['x-wp-total'] ? parseInt(response.headers['x-wp-total'], 10) : 0;
  const totalPages = totalCount > 0 ? Math.ceil(totalCount / perPage) : 1;

  return NextResponse.json({
    count: totalCount,
    currentPage: page,
    perPage,
    totalPages,
    data: response.data,
  });
}

export { GET };

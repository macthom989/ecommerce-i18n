import { NextResponse } from 'next/server';
import { fetchFn } from '@/lib/fetcher';

export async function GET(req: Request) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const perPage = parseInt(searchParams.get('per_page') || '10', 10);

    // Gọi WooCommerce API để lấy danh sách tags
    const tagsUrl = `/wp-json/wc/v3/products/tags?per_page=${perPage}&page=${page}`;
    const tagsResponse = await fetchFn('GET', tagsUrl);

    if (!tagsResponse.data || tagsResponse.data.length === 0) {
      return NextResponse.json({ message: 'No tags found', count: 0, tags: [] }, { status: 200 });
    }

    // Lấy tổng số tags từ header WooCommerce API
    const totalCount = parseInt(tagsResponse.headers?.['x-wp-total'] || '0', 10);

    return NextResponse.json(
      {
        count: totalCount,
        currentPage: page,
        perPage,
        totalPages: Math.ceil(totalCount / perPage),
        tags: tagsResponse.data,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tags', details: error }, { status: 500 });
  }
}

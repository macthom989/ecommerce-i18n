import { fetchFn } from '@/lib/fetcher';
import { NextResponse } from 'next/server';
import { Product } from '@services/types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || ''; // Tìm kiếm sản phẩm theo tên
  const category = searchParams.get('category') || ''; // Lọc theo danh mục
  const per_page = searchParams.get('per_page') || '10'; // Số lượng sản phẩm trả về mỗi lần
  const endpoint = `/wp-json/wc/v3/products?search=${search}&category=${category}&per_page=${per_page}`;

  const { data } = await fetchFn<Product[]>('GET', endpoint);
  return NextResponse.json(data);
}

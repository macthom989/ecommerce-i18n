import { NextResponse } from 'next/server';

const NEXT_PUBLIC_SETTING_URL = process.env.NEXT_PUBLIC_SETTING_URL;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  try {
    const res = await fetch(`${NEXT_PUBLIC_SETTING_URL}/wp-json/yoast/v1/get_head?url=${slug}`);
    const seoData = await res.json();
    return NextResponse.json(seoData);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi lấy metadata' }, { status: 500 });
  }
}

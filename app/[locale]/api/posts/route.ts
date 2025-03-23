import { NextResponse } from 'next/server';

const NEXT_PUBLIC_SETTING_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function GET() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_SETTING_URL}/wp-json/wp/v2/posts`);
    const posts = await res.json();

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi lấy bài viết' }, { status: 500 });
  }
}

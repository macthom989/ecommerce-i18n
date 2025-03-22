import { NextResponse } from 'next/server';

const NEXT_PUBLIC_SETTING_URL = process.env.NEXT_PUBLIC_SETTING_URL;
const WOOCOMMERCE_KEY = process.env.WOOCOMMERCE_KEY;
const WOOCOMMERCE_SECRET = process.env.WOOCOMMERCE_SECRET;

export async function GET() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_SETTING_URL}/wp-json/wc/v3/products`, {
      headers: {
        Authorization: `Basic ${btoa(`${WOOCOMMERCE_KEY}:${WOOCOMMERCE_SECRET}`)}`,
      },
    });

    const products = await res.json();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi lấy sản phẩm' }, { status: 500 });
  }
}

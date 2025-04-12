import { NextRequest, NextResponse } from 'next/server';
import { fetchFn } from '@lib/fetcher';

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body || !body.line_items) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const orderData = {
    payment_method: body.payment_method,
    payment_method_title: body.payment_method_title,
    set_paid: true,
    billing: body.billing,
    shipping: body.shipping,
    line_items: body.line_items,
  };

  const endpointUrl = `/wp-json/wc/v3/orders`;
  const { data } = await fetchFn('POST', endpointUrl, orderData);

  if (!data || !data.id) {
    return NextResponse.json({ error: 'Order creation failed' }, { status: 500 });
  }

  return NextResponse.json({ success: true, orderId: data.id });
}

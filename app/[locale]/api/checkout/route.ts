import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body || !body.line_items) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const orderData = {
    payment_method: 'cod',
    payment_method_title: 'Cash on Delivery',
    set_paid: false,
    billing: body.billing,
    shipping: body.shipping,
    line_items: body.line_items,
  };

  const endpointUrl = `/wp-json/wc/v3/orders/{{order_id}}/pay`;

  // const response = await fetchFn('POST');
}

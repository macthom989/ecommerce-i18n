import { NextRequest, NextResponse } from 'next/server';
import { fetchFn } from '@lib/fetcher';
import { PaymentMethod } from '@services/types';

export async function GET(req: NextRequest) {
  const endPointUrl = '/wp-json/wc/v3/payment_gateways';
  const { data } = await fetchFn<PaymentMethod[]>('GET', endPointUrl);

  const enabledMethods = data?.filter((method: PaymentMethod) => method.enabled);

  return NextResponse.json(enabledMethods, { status: 200 });
}

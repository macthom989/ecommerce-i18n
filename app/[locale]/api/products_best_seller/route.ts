import { NextResponse } from 'next/server';
import data from '@api/products_best_seller.json'; // Import JSON

export async function GET() {
  return NextResponse.json(data);
}

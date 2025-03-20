import { NextResponse } from 'next/server';
import data from '@api/featured_products.json'; // Import JSON

export async function GET() {
  return NextResponse.json(data);
}
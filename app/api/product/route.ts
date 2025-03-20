import { NextResponse } from 'next/server';
import products from '@api/products.json'; // Import JSON

export async function GET() {
  return NextResponse.json(products); // Trả về JSON
}
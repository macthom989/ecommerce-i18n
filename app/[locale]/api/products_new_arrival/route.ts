import { NextResponse } from 'next/server';
import data from '@api/products_new_arrival.json'; // Import JSON

export async function GET() {
  return NextResponse.json(data); // Trả về JSON
}
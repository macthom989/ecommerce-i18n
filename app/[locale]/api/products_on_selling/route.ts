import { NextResponse } from 'next/server';
import data from '@api/products_on_selling.json';

export async function GET() {
  return NextResponse.json(data);
}
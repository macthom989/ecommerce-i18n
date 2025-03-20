import { NextResponse } from 'next/server';
import data from '@api/categories.json'; // Import JSON

export async function GET() {
  return NextResponse.json(data);
}
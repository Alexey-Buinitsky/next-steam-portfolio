import { NextResponse } from 'next/server';
import { getAllTotalItems} from '@/lib/total-cache';

export async function GET() {
  return NextResponse.json({
    items: getAllTotalItems(),
  });
}
// app/api/home/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  
  return NextResponse.json({
    message: 'Welcome to the Home Page!',
  });
}

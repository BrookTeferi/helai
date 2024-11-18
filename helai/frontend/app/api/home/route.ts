// app/api/home/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  // Here you can check user session or registration status
  // For now, we will just return a success message or welcome message.
  
  return NextResponse.json({
    message: 'Welcome to the Home Page!',
  });
}

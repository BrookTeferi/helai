// app/api/login/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // For demonstration purposes, we use hardcoded values
    // You can replace this with a database call to verify user credentials.
    const storedEmail = 'johndoe@example.com';
    const storedPassword = 'pass123';

    if (email === storedEmail && password === storedPassword) {
      // Login successful
      return NextResponse.json({
        message: 'Login successful!',
        status: 'success',
      });
    } else {
      // Invalid credentials
      return NextResponse.json({
        message: 'Invalid email or password',
        status: 'error',
      }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({
      message: 'An error occurred during login',
      status: 'error',
    }, { status: 500 });
  }
}

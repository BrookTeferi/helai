// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Registration handler for Next.js API route
export async function POST(req: NextRequest) {
  const { email, password, first_name, last_name } = await req.json();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        first_name,
        last_name,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ message: 'User registered successfully', data }, { status: 201 });
    } else {
      return NextResponse.json({ message: data.message }, { status: response.status });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ message: 'Error registering user' }, { status: 500 });
  }
}

// app/api/register/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    // Here you can add your logic for registering the user, such as saving the data to the database
    // For example:
    // const user = await UserModel.create(body);
    
    console.log('User registered:', body);

    return NextResponse.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}

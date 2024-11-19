import { NextResponse } from 'next/server';
import { registerUser } from '../../../services/accountUsers';

export async function POST(req: Request) {
    const { username, password, email, role } = await req.json();

    try {
        const user = await registerUser(username, password, email, role);
        return NextResponse.json({ message: 'Registration successful', user });
    } catch (error) {
        return NextResponse.json({ error: 'Registration failed' }, { status: 400 });
    }
}

import { NextResponse } from 'next/server';
import { loginUser } from '../../../services/accountUsers';

export async function POST(req: Request) {
    const { username, password } = await req.json();

    try {
        const user = await loginUser(username, password);
        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
        }
        return NextResponse.json({ message: 'Login successful', user });
    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}

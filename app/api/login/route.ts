import fs from 'fs'
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

type Creds = {
    login: string,
    password: string
}

export const POST = async (
    request: NextRequest
) => {

    const data: Creds = await request.json();

    const { login, password } = data;

    const file = await fs.promises.readFile("app/api/login/users.json", 'utf8');
    const { users } = JSON.parse(file);

    const user = users.find((u: { login: string; }) => u.login === login);
    if (!user) {
        return Response.json({ error: 'User does not exist' }, { status: 401 });
    }

    const isPasswordValid = (password == user.password);
    if (!isPasswordValid) {
        return Response.json({ error: 'Incorrect password' }, { status: 401 });
    }

    const token = jwt.sign(
        { login, password}, "secret123"
    );

    const response = NextResponse.json({ success: true });
    response.cookies.set('authToken', token, {
        httpOnly: true,
        path: '/'
    });

    return response;
}
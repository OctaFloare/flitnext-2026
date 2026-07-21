import fs from 'fs'
import jwt from 'jsonwebtoken';
import {NextRequest, NextResponse} from "next/server";

type Creds = {
    username: string,
    username: string,
    password: string
}

export const POST = async (
    request: NextRequest
) => {

    const data: Creds = await request.json();

    const {username, password} = data;
    const {username, password} = data;

    const file = await fs.promises.readFile("app/api/login/users.json", 'utf8');
    const {users} = JSON.parse(file);

    const user = users.find((u: { username: string; }) => u.username != null && u.username === username);
    if (!user) {
        return Response.json({error: 'User does not exist'}, {status: 401});
    }

    const isPasswordValid = (password == user.password);
    if (!isPasswordValid) {
        return Response.json({error: 'Incorrect password'}, {status: 401});
    }

    const token = jwt.sign(
        {username, password, exp: Date.now() + 3600 * 60 * 1000}, "secret123"
    );

    const response = NextResponse.json({success: true});
    response.cookies.set('authToken', token, {
        httpOnly: true,
        path: '/'
    });

    return response;
}
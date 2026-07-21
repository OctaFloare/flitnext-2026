import fs from 'fs'
import jwt from 'jsonwebtoken';
import {NextRequest, NextResponse} from "next/server";
import { createHash } from 'crypto';

type Creds = {
    username: string,
    password: string
}

export const POST = async (
    request: NextRequest
) => {

    const data: Creds = await request.json();

    const {username, password} = data;

    const file = await fs.promises.readFile("app/api/login/users.json", 'utf8');
    const {users} = JSON.parse(file);

    const foundUser = users.find((user: { username: string; }) => user.username != null && user.username === username);
    if (!foundUser) {
        return Response.json({error: 'User does not exist'}, {status: 401});
    }

    const hashedPassword = createHash('sha256').update(password).digest('hex')

    const isPasswordValid = (hashedPassword == foundUser.password);
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

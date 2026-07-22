import { createHash } from 'crypto';
import fs from 'fs'
import jwt from 'jsonwebtoken';
import {NextRequest, NextResponse} from "next/server";

type Creds = {
    username: string,
    password: string
}

export const POST = async (
    request: NextRequest
) => {

    const data: Creds = await request.json();

    const { username, password } = data;

    const file = JSON.parse(await fs.promises.readFile("app/api/login/users.json", 'utf8'));
    const {users} = file;

    const foundUser = users.find((user: { username: string; }) => user.username === username);
    if (foundUser) {
        return Response.json({ error: 'User already exists' }, { status: 401 });
    }

    const hashedPassword = createHash('sha256').update(password).digest('hex')

    const newUser: Creds = {
        username: username,
        password: hashedPassword
    }

    const appendedUsers = {
        users: [...users, newUser]
    }

    await fs.promises.writeFile("app/api/login/users.json", JSON.stringify(appendedUsers), 'utf8')

    const response = NextResponse.json({success: true});

    return response;
}

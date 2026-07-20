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

    const file = JSON.parse(await fs.promises.readFile("app/api/login/users.json", 'utf8'));
    const { users } = file;

    console.log("file: " + file)

    const user = users.find((u: { login: string; }) => u.login === login);
    if (user) {
        return Response.json({ error: 'User already exists' }, { status: 401 });
    }

    const newUser: Creds = {
        login: login,
        password: password
    }

    const appendedUsers = {
        users: [...users, newUser]
    }

    console.log("Appended users: " + JSON.stringify(appendedUsers))

    await fs.promises.writeFile("app/api/login/users.json", JSON.stringify(appendedUsers), 'utf8')

    const response = NextResponse.json({ success: true });

    return response;
}
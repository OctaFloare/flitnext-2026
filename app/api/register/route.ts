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

    const { username, password } = data;

    const file = JSON.parse(await fs.promises.readFile("app/api/login/users.json", 'utf8'));
    const {users} = file;

    console.log("file: " + file)

    const user = users.find((u: { username: string; }) => u.username === username);
    if (user) {
        return Response.json({error: 'User already exists'}, {status: 401});
    }

    const newUser: Creds = {
        username: username,
        username: username,
        password: password
    }

    const appendedUsers = {
        users: [...users, newUser]
    }

    await fs.promises.writeFile("app/api/login/users.json", JSON.stringify(appendedUsers), 'utf8')

    const response = NextResponse.json({success: true});

    return response;
}
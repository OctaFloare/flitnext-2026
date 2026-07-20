import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {protectedRoutes, publicRoutes, JWT_SECRET} from "@/middleware-config";

import jwt from 'jsonwebtoken'

const secret = JWT_SECRET;


export async function middleware(req: NextRequest, res: NextResponse) {
    console.log('Auth Middleware Hit');

    const authToken = req.cookies.get('authToken')?.value
    const pathname = req.nextUrl.pathname;
    const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

    // do validation here
    if (isProtected) {
        if (!authToken) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
        try {
            jwt.verify(authToken, JWT_SECRET)
            req.headers.set('Authorization', 'Bearer ' + authToken);
            return NextResponse.next();
        } catch (e) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    runtime: 'nodejs',
};
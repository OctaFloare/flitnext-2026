import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {protectedRoutes, publicRoutes, staticAssets, JWT_SECRET} from "@/middleware-config";

import jwt from 'jsonwebtoken'

const secret = JWT_SECRET;

function isTokenExpired(token: string): boolean {
    try {
        const decoded = jwt.decode(token) as { exp?: number } | null;
        if (!decoded?.exp) return true;
        return decoded.exp < Math.floor(Date.now() / 1000);
    } catch {
        return true;
    }
}

export async function middleware(req: NextRequest, res: NextResponse) {

    const authToken = req.cookies.get('authToken')?.value
    const pathname = req.nextUrl.pathname;
    const tokenExpired = authToken ? isTokenExpired(authToken) : null;
    // skip static assets
    if (staticAssets.some(route => pathname.startsWith(route))) {
        return NextResponse.next();
    }
    const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
    // validation
    if (isProtected) {
        if (!authToken || tokenExpired) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
        try {
            // signature verification
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
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
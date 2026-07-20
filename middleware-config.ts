export const protectedRoutes=[
    '/movies',
    '/movies/:movieId',
];

export const publicRoutes=[
    '/login',
    '/register',
]

export const staticAssets = [
    '/_next/static',
    '/_next/image',
    '/favicon.ico',
];

export const JWT_SECRET = process.env.JWT_SECRET || 'secret123'
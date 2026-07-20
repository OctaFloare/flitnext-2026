export const protectedRoutes=[
    '/movies',
    '/movies/:movieId',
];

export const publicRoutes=[
    '/',
    '/login',
]


export const JWT_SECRET = process.env.JWT_SECRET || 'secret123'
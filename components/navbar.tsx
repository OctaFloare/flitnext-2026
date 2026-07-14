import Link from 'next/link'

export const Navbar = () => {

    return <div className='flex gap-5 mb-5'>
        <Link href="/">Home</Link>
        <Link href="/movies">Movies</Link>
    </div>
}

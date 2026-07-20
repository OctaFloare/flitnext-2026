import Link from 'next/link'

const CustomLink = 
    ({ href, text }: {
        href: string,
        text: string
    }) => {

    return <Link href={href}>
        <p className='text-lg text-black'>{text}</p>
    </Link>
}

export const Navbar = () => {

    return <div className='bg-amber-400 w-full p-2'>
        <div className='flex justify-center gap-5'>
            <CustomLink href="/" text={"Home"} />
            <CustomLink href="/movies" text="Movies"/>
            <CustomLink href="/ broken-link" text="Broken Link" />
        </div>
    </div>
}

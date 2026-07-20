'use client'

import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import * as data from '../../mock.json'

type Movies = typeof data

export const MoviesContent = () => {
    const { data, error } = useQuery<Movies>({
        queryKey: ['movies'],
        queryFn: async () => {
            const data = await fetch('/api/movies', { method: 'GET'})

            return data.json()
        }
    })

    console.log(data, error , "this is response")

    return <div>
        <h1 className="font-bold font-sans text-amber-400 text-4xl mb-10 mt-6">
            Movie Catalog
        </h1>
        <div className="grid grid-cols-3 gap-5">
            {data && data.map((movie) => (!movie.deleted &&
                <div className="flex p-5 border-2 border-amber-300 items-center justify-center flex-col" key={movie.id}>
                    <>
                        <p className="text-lg m-2">{movie.title}</p><p className="text-gray-300 font-bold">({movie.release_year})</p>
                    </>
                    <>
                        <p>Genres: {movie.genres.join(", ")}</p>
                        <Link href={`/movies/${movie.id}`}>
                        <Image 
                            src={movie.imgUrl} 
                            alt={`${movie.title}-image`}
                            width={200}
                            height={200}
                            
                        /></Link>
                    </>
                </div>
            ))}
        </div>
    </div>
}

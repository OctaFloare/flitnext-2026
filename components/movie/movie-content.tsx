'use client'

import {useQuery} from "@tanstack/react-query"
import * as moviesData from '../../mock.json'
import {useDeleteMovie} from "./hooks/useDeleteMovie"

type Movie = typeof moviesData[0]

export const MovieContent = ({movieId}: {
    movieId: number,
}) => {
    const {data, error} = useQuery<Movie>({
        queryKey: ['movie', `${movieId}`],
        queryFn: async () => {
            const result = await fetch(`/api/movie/${movieId}`, {
                method: "GET"
            })

            return result.json()
        }
    })

    const {mutate, data: deleteData} = useDeleteMovie({movieId})

    const onDeleteClick = () => {
        mutate()
    }

    return <div>
        <div className="items-center justify-center flex">
            {data &&
                <div className="flex items-center justify-center gap-2">
                    <h1 className="font-bold font-sans text-amber-400 text-4xl mb-10 mt-6 "> {data.title} </h1>
                    <h1 className="font-bold font-sans text-amber-200 text-4xl mb-10 mt-6 "> ({data.release_year})</h1>
                </div>}
        </div>
        <div className="flex items-center justify-center w-full">
            {data &&
                <div>
                    <video width="1080" height="720" controls>
                        <source src={`${data.sourceUrl}`}></source>
                        Your browser does not support the video tag.
                    </video>
                </div>}
        </div>
        <button className="bg-red-500 p-2" onClick={onDeleteClick}>Delete Movie</button>
        {deleteData && <div>{deleteData.message}</div>}
    </div>
}

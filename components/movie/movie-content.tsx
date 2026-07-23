'use client'

import { useQuery } from "@tanstack/react-query"
import * as moviesData from '../../mock.json'
import { useDeleteMovie } from "./hooks/useDeleteMovie"

type Movie = typeof moviesData[0]

export const MovieContent = ({ movieId } : {
    movieId: number,
}) => {
    const { data, error } = useQuery<Movie>({
        queryKey: ['movie', `${movieId}`],
        queryFn: async () => {
            const result = await fetch(`/api/movie/${movieId}`, {
                method: "GET"
            })

            return result.json()
        }
    })

    const { mutate, data: deleteData } = useDeleteMovie({ movieId })

    const onDeleteClick = () => {
        mutate()
    }

    return <div>
        <div>
      <h1 className="font-bold font-sans text-amber-400 text-4xl mb-10 mt-6">
          Movie id: {movieId}
      </h1>
      <button className="bg-red-500 p-2" onClick={onDeleteClick}>Delete Movie</button>
      {deleteData && <div>{deleteData.message}</div>}
      </div>
      <div className="grid grid-cols-3 gap-5">
          {data && <>{data.title}
          <video width="320" height="240" controls>
            <source src={`${data.sourceUrl}`}></source>
            Your browser does not support the video tag.
          </video>
          </>}
      </div>
  </div>
}

import * as data from '../../../../mock.json'
import fs from 'fs'

export const GET = async (
    request: Request,
    { params }: { params: Promise<{ movieId: string }> }
) => {
    const { movieId } = await params;

    const movie = data.find(movieEntry => 
        movieEntry.id === parseInt(movieId, 10)
    )

    return new Response(JSON.stringify(movie),
        {
            status: 200,
            headers: { 'ContentType': 'application/json' }
        }
    )
}

export const DELETE = async (
     request: Request,
    { params }: { params: Promise<{ movieId: string }> }
) => {
    const {movieId} = await params
    const newMovieData = data.map(movie => {
        if(movie.id === parseInt(movieId, 10)) {
            return {
             ...movie,
             deleted: true   
            }
        }

        return movie
    })

    fs.writeFile(
        './mock.json',
        JSON.stringify(newMovieData),
        'utf8',
        () => {}
    )

    const response = {
        message: 'Movie was deleted'
    }

    return new Response(JSON.stringify(response), {
        status: 200,
        headers: { 'ContentType': 'application/json' }
    })
}

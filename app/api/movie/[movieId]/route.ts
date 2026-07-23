import data from '../../../../mock.json'
import fs from 'fs'
import path from 'path'

export const GET = async (
    _request: Request,
    { params }: { params: Promise<{ movieId: string }> }
) => {
    const { movieId } = await params;

    const getMockData = () => {
    const filePath = path.join(process.cwd(), 'mock.json')
    const fileContent = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContent)
}

    const movie = getMockData().find((movieEntry: typeof data[0]) => 
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
     _request: Request,
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

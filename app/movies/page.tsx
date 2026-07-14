import {movies} from './mock-movies.json'

const MoviePage = () => {
    return <div>

        <h1 className="text-4xl font-bold text-blue-600 mb-6">
            This is movie page
        </h1>
        
        <div className="space-y-4">
            {movies.map((movie) => (
            <div className="p-5 border-2 border-blue-200 hover:border-blue-500"><p key={movie.title}>
            {movie.title} ({movie.year}) — {movie.genre}
            </p> </div>
        ))}
        </div>
    </div>
}

export default MoviePage
import {movies_mock} from "../../mock.json"

const MoviePage = () => {
    return <div>
        <h1 className="font-bold font-sans text-amber-400 text-4xl mb-10 mt-6">
            Movie Catalog
        </h1>
        <div className="grid grid-cols-3 gap-5">
            {movies_mock.map((movie) => (
                <div className="flex border-2 border-amber-300 items-center justify-center flex-col" key={movie.id}>
                    <>
                        <p className="text-lg m-2">{movie.title}</p><p className="text-gray-300 font-bold">({movie.release_year})</p>
                    </>
                    <>
                        <p>Genres: {movie.genres.join(", ")}</p>
                    </>
                </div>
            ))}
        </div>
    </div>
}

export default MoviePage
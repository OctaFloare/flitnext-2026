import {movies_mock} from "../../../mock.json"


export default async function MovieCard({
    params,
    }: {
  params: Promise<{ movieId: number }>
}) {
  const { movieId } = await params

  const foundMovie = movies_mock.find((movie) => movie.id == movieId);

  return <div>
      <h1 className="font-bold font-sans text-amber-400 text-4xl mb-10 mt-6">
          Movie id: {movieId}
      </h1>
      <div className="grid grid-cols-3 gap-5">
          {foundMovie && <>`${foundMovie.title}`
          <video width="320" height="240" controls>
            <source src={`${foundMovie.sourceUrl}`}></source>
            Your browser does not support the video tag.
          </video>
          </>}
      </div>
  </div>

}
import { MovieContent } from "@/components/movie/movie-content";

export default async function MovieCard({
    params,
    }: {
  params: Promise<{ movieId: number }>
}) {
  const { movieId } = await params

  return <MovieContent movieId={movieId} /> 
}
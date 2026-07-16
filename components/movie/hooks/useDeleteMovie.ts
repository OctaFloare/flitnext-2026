import { useMutation } from "@tanstack/react-query"

export const useDeleteMovie = ({movieId}: {movieId: number}) => {

    return useMutation<{ message: string }>({
        mutationKey: ['movie', `${movieId}`],
        mutationFn: async () => {
            const result = await fetch(`/api/movie/${movieId}`, {
                method: "DELETE"
            })

            return result.json()
        }
    })
}
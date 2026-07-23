'use client'

import { useQuery } from "@tanstack/react-query"
import * as moviesData from '../../mock.json'
import { useDeleteMovie } from "./hooks/useDeleteMovie"
import { useState, useRef } from "react"

type Movie = typeof moviesData[0]

export const MovieContent = ({ movieId } : {
    movieId: number,
}) => {
    const videoRef = useRef<HTMLVideoElement >(null)
    const hasEndedRef = useRef(false)
    const [isReady, setReady] = useState(false)
    const [showButton, setShowButton] = useState(false)
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

    function SkipIntro() {
        const videoElement = videoRef.current
        if(!isReady){
    
            setReady(true);
        }
        if(videoElement == null) return

        videoElement.currentTime = videoElement.duration;
        setReady(false)
        setShowButton(false)

    }

   
    const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    
    const currentTime = event.currentTarget.currentTime;

    if (currentTime >= 2 && !showButton) {
      setShowButton(true);
    }

    if(currentTime == 5){
        setShowButton(false);
    }

};

    const handleEnded = () => {
        hasEndedRef.current = true
        setShowButton(false)
    }

    const handleSeeked = (event: React.SyntheticEvent<HTMLVideoElement>) => {
        const videoElement = event.currentTarget

        if (hasEndedRef.current && videoElement.currentTime < videoElement.duration) {
            hasEndedRef.current = false
            videoElement.play()
        }
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
          {data && <>`${data.title}`
          <video ref={videoRef} width="320" height="240" controls onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} onSeeked={handleSeeked} >
            <source src={`${data.sourceUrl}`}></source>
            Your browser does not support the video tag.
          </video>
          </>}
          {showButton &&( 
             <button onClick={SkipIntro} >
                Skip Intro
            </button>
          )}
      </div>
  </div>
}

'use client'

import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import * as data from '../../mock.json'
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from "swiper/modules"
import 'swiper/css';
import 'swiper/css/navigation';
import './styles.css';

type Movies = typeof data

export const MoviesContent = () => {
    const { data, error } = useQuery<Movies>({
        queryKey: ['movies'],
        queryFn: async () => {
            const data = await fetch('/api/movies', { method: 'GET'})

            return data.json()
        }
    })

    console.log(data, error , "this is response")

    return <div>
        <h1 className="font-bold font-sans text-amber-400 text-4xl mb-10 mt-6">
            Movie Catalog
        </h1>

        <Swiper navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        slidesPerView={1}
        breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
        }}
        autoHeight= {true}
        spaceBetween={0}
        >
            {data && data.map((movie) => (!movie.deleted &&
                <SwiperSlide key={movie.id} className="">
                    <div className="w-63">
                        <p className="text-lg m-2">{movie.title}</p><p
                        className="text-gray-300 font-bold">({movie.release_year})</p>

                        <p>Genres: {movie.genres.join(", ")}</p>
                        <Link href={`/movies/${movie.id}`}>
                            <Image
                                src={movie.imgUrl}
                                alt={`${movie.title}-image`}
                                width={200}
                                height={200}

                            /></Link>
                    </div>
                </SwiperSlide>))}
        </Swiper>
    </div>
}

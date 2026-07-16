import { NextApiRequest, NextApiResponse } from "next"
import * as data from "../../../mock.json"

type Movie = {
    id: number;
    title: string;
    genres: string[];
    release_year: number;
    sourceUrl: string;
    imgUrl: string;
}

export const GET = async (request: Request) => {
   return new Response(JSON.stringify(data.movies_mock), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

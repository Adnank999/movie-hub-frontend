'use server'

import { MovieDetails } from "@/models/MovieDetails";
import Image from "next/image";
import React from "react";
import AddToFavourite from "./AddToFavourite";
import { cookies } from "next/headers";
import { z } from "zod";
import { MovieDetailsSchema } from "@/models/MovieDetailsSchema";
import Rating from "./Rating";

interface Props {
  id: string;
  movieDetails: MovieDetails;
}

export default async function MovieDetailsCard({ movieDetails, id }: Props) {

  const validMovieDetails = MovieDetailsSchema.parse(movieDetails);



  return (
    <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10">
      <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      { !movieDetails.imageUrl ? (
        
        <div className="w-full bg-gray-300 flex flex-col justify-center items-center">
          <span className="text-black ">No Image</span>
        </div>
      ) : (
        <Image
          src={movieDetails.imageUrl}
          width={0}
          height={0}
          alt="movie-poster"
          className="w-full h-full object-cover"
          unoptimized
        />
      )}

        <AddToFavourite movieDetails={validMovieDetails} id={id} />

        <div>
          <Rating movieId={id} movieDetails={movieDetails}/>
        </div>
      </div>
      

      <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-6">
        <div>
          <h1 className="text-xl text-red-600 text-center lg:text-start">Overview</h1>
          <h4 className="text-center lg:text-start">{validMovieDetails.description}</h4>
        </div>

        <div className="">
          <h1 className="text-xl text-red-600 text-center lg:text-start">Genre</h1>
          <div className="flex flex-wrap gap-2 items-center">
            {validMovieDetails.genre.map((gen, index) => (
              <React.Fragment key={index}>
                <span>{gen}</span>
                
                {index < validMovieDetails.genre.length - 1 && <span>&bull;</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
  
      </div>
    </div>
    
  );
}

export async function addMovieToCookies(movieDetails: MovieDetails, id: string) {
  'use server';

  try {
    const movieCookieKey = `movie_${id}`;
    const movieData = JSON.stringify(movieDetails);

    
    cookies().set(movieCookieKey, movieData, { path: '/', maxAge: 60 * 60 * 24 }); 

  
  } catch (error) {
    
  }
}

export async function deleteMovieFromCookies(id: string) {
  'use server';

  try {
    const movieCookieKey = `movie_${id}`;


    cookies().delete(movieCookieKey);

  
  } catch (error) {
    console.error("Error deleting movie from cookies:", error);
  }
}

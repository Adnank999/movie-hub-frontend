import React from "react";
import MovieDetailsCard from "./components/MovieDetailsCard";



export default async function MovieDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params; 
  
  

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_HOST}/movies/${id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  const movieDetails = await response.json();

  return (
    <div className="mx-auto max-w-4xl mt-6">
      <MovieDetailsCard movieDetails={movieDetails} id={id} />
    </div>
  );
}
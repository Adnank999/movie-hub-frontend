"use client";

import { useState, useEffect, Suspense } from "react";


import { useGetPopularMoviesQuery } from "../../redux/movie/movieApi";
import MovieCard from "./MovieCard";
import _ from "lodash";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";
import MovieCardSkeleton from "@/app/components/MovieCardSkeleton";
import Loader from "@/app/components/Loader";
import useSocket from "@/hooks/useSocket";

gsap.registerPlugin(ScrollTrigger);

const PopularMovies: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [newMovieAdded, setNewMovieAdded] = useState(false);

  const {
    data: popularData,
    error,
    isFetching,
    refetch,
  } = useGetPopularMoviesQuery({});

  useSocket("new-movie", (message) => {
    if (message) {
      setNewMovieAdded(true);
    }
  });

  useEffect(() => {
    if (newMovieAdded) {
      refetch();
      setNewMovieAdded(false);
    }
  }, [newMovieAdded, refetch]);

  useEffect(() => {
    if (popularData) {
      setMovies(popularData);
    }
  }, [popularData]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  if (error) return <div>Error loading movies.</div>;



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center ">Popular Movies</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer">
        {movies.map((movie) => (
          <div key={movie._id} className="transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-102">
            <Suspense fallback={<MovieCardSkeleton />}>
              <MovieCard movie={movie} section="popularMovies" />
            </Suspense>
          </div>
        ))}
      </div>

      {isFetching && (
        <div className="flex flex-col justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default PopularMovies;

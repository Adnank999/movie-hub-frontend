"use client";
import { MovieDetails } from "@/models/MovieDetails";
import { useAddRatingMutation } from "@/redux/movie/movieApi";
import { selectMovieRating, setRating } from "@/redux/movie/ratingSlice";
import { RootState } from "@/redux/store";
import { Star, StarHalf } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface RatingProps {
  movieId: string;
  movieDetails: MovieDetails;
}
const Rating = ({ movieId, movieDetails }: RatingProps) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [addRating] = useAddRatingMutation();

  const dispatch = useDispatch();
  const persistedRating = useSelector((state: RootState) =>
    selectMovieRating(state, movieId)
  );

  const router = useRouter();
  const handleRate = async (rating: number) => {
    try {
      await addRating({ movieId, rating }).unwrap();
      setSelectedRating(rating);
      dispatch(setRating({ movieId, rating }));
      router.refresh();
   
    } catch (error) {
      // console.error("Failed to rate movie", error);
    }
  };


  const userId = useSelector((state: RootState) => state.user.user?.id);
  const currentUserRating = movieDetails?.ratings?.find(
    (ratingItem) => ratingItem.user === userId
  )?.rating;

 
  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="flex gap-1 cursor-pointer">
          {Array.from({ length: 10 }).map((_, index) => (
            <Star
              key={index}
              fill={
                (currentUserRating?.length && index < currentUserRating.length) ||
                (persistedRating && index < persistedRating)
                  ? "#FFD700"
                  : "#111"
              }
              strokeWidth={0}
              onClick={() => handleRate(index + 1)}
              className="hover:scale-110 transition-transform"
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">All User Ratings:</h3>
        {movieDetails?.ratings?.length ? (
          movieDetails.ratings.map((ratingItem, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex">
                {Array.from({
                  length: Array.isArray(ratingItem.rating)
                    ? ratingItem.rating.length
                    : 0,
                }).map((_, i) => (
                  <Star key={i} fill="#FFD700" strokeWidth={0} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No ratings yet.</p>
        )}
      </div>
    </div>
  );
};

export default Rating;

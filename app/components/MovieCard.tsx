"use client";
import React from "react";
import {
  Card,

  CardHeader,
  
} from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
interface MovieCardProps {
  movie: {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    wishlist: boolean;
    genre: string[];
    user: string;
    ratings: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  section: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, section }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const handleCardClick = () => {
    router.push(`/movieDetails/${movie._id}`);
  };

  return (
    <Card
      className={`bg-transparent relative ${
        theme === "dark" ? "border border-white" : "border border-black"
      }`}
      onClick={handleCardClick}
    >
      <CardHeader className="p-0 h-full ">
        <Image
          src={movie.imageUrl}
          alt={movie.title}
          loading="lazy"
          width={0}
          height={0}
          sizes="100vw"
          className={` object-cover w-full h-52 `}
        />
      </CardHeader>
      
      <h2 className="text-lg font-semibold text-center absolute bottom-1 left-1/2 transform -translate-x-1/2">
        {movie.title}
      </h2>
    </Card>
  );
};

export default MovieCard;

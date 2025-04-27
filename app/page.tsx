import Image from "next/image";
import PopularMovies from "./components/PopularMovies";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl">
      <PopularMovies />
    </div>
  );
}
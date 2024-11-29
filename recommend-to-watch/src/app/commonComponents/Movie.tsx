import Image from "next/image";
import React, { FC } from "react";

const Movie: FC<MovieProps> = ({
  overview,
  poster_path,
  release_date,
  title,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-lg font-bold max-w-64 text-center movie-title">
          {title}
        </h1>
        <h3 className="text-sm font-semibold mb-2 movie-year">
          ({new Date(release_date).getFullYear()})
        </h3>
        <Image
          src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`}
          alt={`Poster for ${title}`}
          quality={100}
          width={256}
          height={384}
          className="movie-poster"
        />
      </div>
      <p className="w-64 line-clamp-4 movie-overview">{overview}</p>
    </div>
  );
};

type MovieProps = {
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
};

export default Movie;

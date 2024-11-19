import Image from "next/image";
import React, { FC } from "react";

const Movie: FC<MovieProps> = ({
  overview,
  poster_path,
  release_date,
  title,
}) => {
  return (
    <div className="movieCard">
      <div className="firstItemsMovieCard">
        <div className="flexColumn">
          <h1 className="movieTitle">{title}</h1>
          <h3>({new Date(release_date).getFullYear()})</h3>
        </div>
        <Image
          src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`}
          alt={`Poster for ${title}`}
          quality={100}
          width={256}
          height={384}
        />
      </div>
      <h5 className="movieOverview">{overview}</h5>
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

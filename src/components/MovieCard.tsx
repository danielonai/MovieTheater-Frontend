import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/Movie';
import { Screening } from '../types/Screening';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

  return (
    <div className="movieCard border p-6 mb-6 flex flex-col items-center ">
      <img
        src={movie.cover}
        alt={movie.title}
        className="mb-4 rounded-lg"
      />
      <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
      <div className="text-left mb-2">
        <p className="text-sm font-semibold">Screening times:</p>
      </div>
      <div className="flex flex-wrap">
        {movie.screenings.map((screening: Screening, index: number) => (
          <Link
          to={'/order'}
          state={{movie, screening}}
            key={index}
            className="cursor-pointer bg-gray-200 rounded-md p-2 m-1"
          >
            {new Date(screening.date).toLocaleString('he-IL', {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;

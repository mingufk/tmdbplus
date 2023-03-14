import axios from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  let { movieId } = useParams();

  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchMovie() {
      const response = await axios.get(`movie/${movieId}`);
      setMovie(response.data);
      console.log(response);
    }
    fetchMovie();
  }, [movieId]);

  if (!movie) return null;

  return (
    <section
      style={{
        marginTop: '6rem',
        display: 'flex',
        padding: '1rem',
        gap: '1rem',
      }}
    >
      <div>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt="poster"
          style={{ width: '100%' }}
        />
      </div>

      <div>
        <h1>{movie.title}</h1>
        <h4>{movie.release_date}</h4>
        <p>{movie.overview}</p>
      </div>
    </section>
  );
};

export default DetailPage;

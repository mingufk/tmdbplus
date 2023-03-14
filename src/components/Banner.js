import axios from '../api/axios';
import requsets from '../api/requests';
import React, { useEffect, useState } from 'react';
import './Banner.css';
import styled from 'styled-components';

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(requsets.fetchTrending);

    const movieId =
      response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ].id;

    const { data: movieDetail } = await axios.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'videos',
      },
    });

    setMovie(movieDetail);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n - 1) + '...' : str;
  };

  if (isClicked) {
    return (
      <>
        <div className="banner__buttons">
          <button
            className="banner__button close"
            onClick={() => setIsClicked(false)}
          >
            X
          </button>
        </div>

        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${movie?.videos?.results[0]?.key}?controls=0&autoplay=1&mute=1&loop=1&playlist=${movie?.videos?.results[0]?.key}`}
              width="640"
              height="360"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            ></Iframe>
          </HomeContainer>
        </Container>
      </>
    );
  } else {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
        }}
      >
        <div className="banner__contents">
          <div className="banner__buttons">
            {movie?.videos?.results[0]?.key && (
              <img
                src="/images/youtube_icon_red.png"
                className="banner__button youtube"
                onClick={() => setIsClicked(true)}
                alt="YouTube"
              />
            )}
          </div>

          <h1 className="banner__title">
            {movie.title || movie.name || movie.original_name}
          </h1>

          <p className="banner__description">{truncate(movie.overview, 200)}</p>
        </div>

        <div className="banner--fadeBottom" />
      </header>
    );
  }
};

export default Banner;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 448px;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

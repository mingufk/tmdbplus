import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useDebounce } from '../../hooks/useDebounce';
import './SearchPage.css';

const SearchPage = () => {
  const navigate = useNavigate();

  const [searchResult, setSearchResult] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();

  const searchTerm = query.get('q');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const response = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      setSearchResult(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  if (searchResult.length > 0) {
    return (
      <section className="search-container">
        {searchResult.map((movie) => {
          if (movie.poster_path !== null && movie.media_type !== 'person') {
            const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

            return (
              <div className="movie" key={movie.id}>
                <div
                  className="movie__column-poster"
                  onClick={() => navigate(`/${movie.id}`)}
                >
                  <img
                    src={imageUrl}
                    alt={movie.title}
                    className="movie__poster"
                  />
                </div>
              </div>
            );
          }
        })}
      </section>
    );
  } else {
    return (
      <section className="no-results">
        <div className="no-results__text">
          <p>
            No results found for <strong>{searchTerm}</strong>
          </p>
        </div>
      </section>
    );
  }
};

export default SearchPage;

import React, { useRef } from 'react';
import useOnclickOutside from '../../hooks/useOnclickOutside';
import './MovieModal.css';

const MovieModal = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  vote_count,
  setModalOpen,
}) => {
  const ref = useRef();

  useOnclickOutside(ref, () => {
    setModalOpen(false);
  });

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          <img
            className="modal__poster-img"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt={title || name}
          />

          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user_perc">
                {release_date ? release_date : first_air_date}
              </span>
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">
              {vote_average} ({vote_count})
            </p>
            <p className="modal__overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;

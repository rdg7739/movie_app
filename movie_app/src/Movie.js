import React from "react";
import "./Movie.css";
import PropTypes from "prop-types";
import LinesEllipsis from "react-lines-ellipsis";

function Movie({ title, src, genres, synopsis }) {
  return (
    <div className="Movie">
      <div className="Movie_Column">
        <MoviePoster poster={src} alt={title} />
      </div>
      <div className="Movie_Column">
        <h1>{title}</h1>
        <div className="Movie_Genres">
          {genres.map((genre, index) => (
            <MovieGenre genre={genre} key={index} />
          ))}
        </div>
        <div className="Movie_Synopsis">
          <LinesEllipsis
            text={synopsis}
            maxLine="3"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </div>
      </div>
    </div>
  );
}

function MovieGenre({ genre }) {
  return <span className="Movie_Genre">{genre}</span>;
}
function MoviePoster({ poster, alt }) {
  return <img src={poster} alt={alt} title={alt} className="Movie_Poster" />;
}
Movie.propTypes = {
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  genres: PropTypes.array,
  synopsis: PropTypes.string.isRequired
};
MoviePoster.propTypes = {
  poster: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};
MovieGenre.propTypes = {
  genre: PropTypes.string.isRequired
};
export default Movie;

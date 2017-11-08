import React from "react";
import "./Movie.scss";
import PropTypes from "prop-types";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import LinesEllipsis from "react-lines-ellipsis";
import StarRatingComponent from 'react-star-rating-component';

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxLine: 3,
      open: false
    };
  }

  _handleOpen = () => {
    this.setState({open: true});
  };

  _handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const title = `${this.props.title} (${this.props.year})`;
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onClick={this._handleClose}
      />,
    ];
    return (
      <div className="Movie" onClick={this._handleOpen} >
        <div className="Movie_Column">
          <MoviePoster poster={this.props.src} alt={this.props.title} />
        </div>
        <div className="Movie_Column">
          <h1>{this.props.title}</h1>
          <div className="Movie_Genres">
            {this.props.genres.map((genre, index) => (
              <MovieGenre onclick={this.props.onClickGenre} key={index} genre={genre} />
            ))}
          </div>
          <LinesEllipsis
            text={this.props.synopsis}
            maxLine={this.state.maxLine}
            ellipsis="<Read More>"
            trimRight
            basedOn="letters"
          />
        </div>
        <Dialog
          title={title}
          actions={actions}
          modal={false}
          open={this.state.open}
          autoScrollBodyContent={true}
          onRequestClose={this._handleClose}>
          <div style={{fontSize: 20}}>
          <StarRatingComponent
              name="Rate"
              value={this.props.rating/2} 
              editing={false}
          />
          </div>
          <div className="Movie_Genres" style={{marginBottom:0}}>
            {this.props.genres.map((genre, index) => (
              <MovieGenre onclick={this.props.onClickGenre} key={index} genre={genre} />
            ))}
          </div>
          <div className="Movie_Synopsis">
            <div>Language: {this.props.language} </div>
            <div>Rated: {this.props.mpa_rating} </div>
            <div>{this.props.synopsis} </div>
            <div>For more details <a href={this.props.ytsUrl} target="_blank">click here</a></div>
          </div>
        </Dialog>
      </div>
    );
  }
}

function MovieGenre({ genre, onclick }) {
  return <span className="Movie_Genre" onClick={()=>onclick({genre})}>{genre}</span>;
}
function MoviePoster({ poster, alt }) {
  return <img src={poster} alt={alt} title={alt} className="Movie_Poster" />;
}
Movie.propTypes = {
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  genres: PropTypes.array,
  synopsis: PropTypes.string.isRequired,
  bckgdImg: PropTypes.string
};
MoviePoster.propTypes = {
  poster: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};
MovieGenre.propTypes = {
  genre: PropTypes.string.isRequired
};
export default Movie;

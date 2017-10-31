import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';
import SideBar from './SideBar';
import { Col} from "react-bootstrap";
class App extends Component {
  state={}

  //render: componentWillMount -> render -> componentDidMount
  //update: componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate(open loading modal) -> render() -> componentDidUpdate(hide loading modap)
  componentDidMount(){
    this._getMovies();
  }

   _getMovies = async () => {
    const movies = await this._callApi()
    this.setState({
      movies
    })
  }
   
  _callApi = ()=>{
    //request api
    return fetch('https://yts.ag/api/v2/list_movies.json?sort_by='+document.getElementById("formControlsSelect").value)
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }
  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return <Movie 
        title={movie.title_english} 
        src={movie.medium_cover_image} 
        key={movie.id} 
        genres={movie.genres}
        synopsis={movie.synopsis}
      />
    })
    return movies
  }

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        <Col xs={12} sm={2} md={3}>
        <SideBar/>
        </Col>
        <Col xs={12} sm={10} md={9}>
        {!movies ? 'Loading' : (this._renderMovies()) }
        </Col>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';
import SideBar from './SideBar';
import PageBtns from './PageBtns';
import { Col} from "react-bootstrap";
class App extends Component {
  apiUrl= "https://yts.ag/api/v2/list_movies.json";
  apiError= false;
  
  constructor(props){
    super(props);
    this.state= {
      movies: null,
      totalMovies: null,
      currPage: 1,
      sortType: "download_count",
      limit: 20,
      orderBy: "asc",
      quality: "",
      minRate: "0",
      search: "",
      genre: "",
      RtRate: "false"
    };
    this._onChangeCurrPage = this._onChangeCurrPage.bind(this);
    this._onChangeSortType = this._onChangeSortType.bind(this);
    this._onChangeLimit = this._onChangeLimit.bind(this);
    this._onChangeOrderBy = this._onChangeOrderBy.bind(this);
    this._onChangeQuality = this._onChangeQuality.bind(this);
    this._onChangeMinRate = this._onChangeMinRate.bind(this);
    this._onChangeSearch = this._onChangeSearch.bind(this);
    this._onChangeGenre = this._onChangeGenre.bind(this);
    this._onChangeRtRate = this._onChangeRtRate.bind(this);
  }
  //render: componentWillMount -> render -> componentDidMount
  //update: componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate(open loading modal) -> render() -> componentDidUpdate(hide loading modap)
  componentDidMount(){
    this._getMovies();
    
  }
  componentDidUpdate(prevProps, prevState){
    // console.log('the totalMovies: '+ this.state.totalMovies+
    // ' | the currPage: '+ this.state.currPage+
    // ' | the sortType: '+ this.state.sortType+
    // ' | the limit: '+ this.state.limit+
    // ' | the orderBy: '+ this.state.orderBy+
    // ' | the quality: '+ this.state.quality+
    // ' | the minRate: '+ this.state.minRate+
    // ' | the search: '+ this.state.search+
    // ' | the genre: '+ this.state.genre+
    // ' | the RtRate: '+ this.state.RtRate);
    if (prevState.currPage !== this.state.currPage ||
      prevState.sortType !== this.state.sortType ||
      prevState.limit !== this.state.limit ||
      prevState.orderBy !== this.state.orderBy ||
      prevState.quality !== this.state.quality ||
      prevState.minRate !== this.state.minRate ||
      prevState.search !== this.state.search ||
      prevState.genre !== this.state.genre ||
      prevState.RtRate !== this.state.RtRate
    ) {
      this.apiUrl = "https://yts.ag/api/v2/list_movies.json?"+
        "limit="+ this.state.limit+
        "&page="+ this.state.currPage+
        "&quality="+ this.state.quality+
        "&minimum_rating="+ this.state.minRate+
        "&query_term="+ this.state.search+
        "&genre="+ this.state.genre+
        "&sort_by="+ this.state.sortType+
        "&order_by="+ this.state.orderBy+
        "&with_rt_ratings="+ this.state.RtRate;
        this._getMovies();
        console.log("change url: "+this.apiUrl);
    }
  }

   _getMovies = async () => {
    const movieData = await this._callApi()
    if(movieData !== undefined){
      this.setState({
        movies: movieData.movies,
        totalMovies: movieData.totalMovies
      })
    }
  }
   
  _callApi = ()=>{
    //request api
    this.apiUrl = "https://yts.ag/api/v2/list_movies.json?"+
    "limit="+ this.state.limit+
    "&page="+ this.state.currPage+
    "&quality="+ this.state.quality+
    "&minimum_rating="+ this.state.minRate+
    "&query_term="+ this.state.search+
    "&genre="+ this.state.genre+
    "&sort_by="+ this.state.sortType+
    "&order_by="+ this.state.orderBy+
    "&with_rt_ratings="+ this.state.RtRate;
    const movieData =  fetch(this.apiUrl)
    .then(response => response.json())
    .then(json => ({movies: json.data.movies, totalMovies: json.data.movie_count}))
    .catch(
      function(err){
        console.log("ERROR:" +err);
      }
    )
    const json = _getMovieData();
    if(movieData){
      this.apiError = false;
      return movieData;
    }
    this.apiError = true;
    return ({movies: json[0].data.movies, totalMovies: json[0].data.movie_count});
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

  _onChangeCurrPage(page) {
    this.setState({currPage: page.page})
  }
  _onChangeSortType(sortType) {
    this.setState({currPage: 1, sortType: sortType.target.value})
  }
  _onChangeLimit(limit) {
    this.setState({currPage: 1, limit: limit.target.value})
  }
  _onChangeOrderBy(orderBy) {
    this.setState({currPage: 1, orderBy: orderBy.target.value})
  }
  _onChangeQuality(quality) {
    this.setState({currPage: 1, quality: quality.target.value})
  }
  _onChangeMinRate(minRate) {
    this.setState({currPage: 1, minRate: minRate.target.value})
  }
  _onChangeSearch(search) {
    this.setState({currPage: 1, search: search.target.value})
  }
  _onChangeGenre(genre) {
    this.setState({currPage: 1, genre: genre.target.value})
  }
  _onChangeRtRate(rtRate) {
    this.setState({currPage: 1, rtRate: rtRate.target.value})
  }
  
  render() {
    const { movies, totalMovies, currPage, sortType, limit, orderBy, quality, minRate, search, genre, RtRate} = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        <Col xs={12}>
        {this.apiError? "Error while getting movie data, please try again after few minute" :
        <PageBtns totalMovies={totalMovies} currPage={currPage} onclick={this._onChangeCurrPage}/> }
        </Col>
        <Col xs={12} sm={2} md={3}>
        {this.apiError? "Error while getting movie data, please try again after few minute" :
        <SideBar 
        sortType={sortType} onChangeSortType={this._onChangeSortType}
        limit={limit} onChangeLimit={this._onChangeLimit}
        orderBy={orderBy} onChangeOrderBy={this._onChangeOrderBy}
        quality={quality} onChangeQuality={this._onChangeQuality}
        minRate={minRate} onChangeMinRate={this._onChangeMinRate}
        search={search} onChangeSearch={this._onChangeSearch}
        genre={genre} onChangeGenre={this._onChangeGenre}
        RtRate={RtRate} onChangeRtRate={this._onChangeRtRate}
        />}
        </Col>
        <Col xs={12} sm={10} md={9}>
        {!movies ? 'Loading...' : (this._renderMovies()) }
        </Col>
      </div>
    );
  }

}
function _getMovieData(){
  return [{  
    "status":"ok",
    "status_message":"Query was successful",
    "data":{  
       "movie_count":6496,
       "limit":20,
       "page_number":1,
       "movies":[  
          {  
             "id":470,
             "url":"https://yts.ag/movie/big-hero-6-2014",
             "imdb_code":"tt2245084",
             "title":"Big Hero 6",
             "title_english":"Big Hero 6",
             "title_long":"Big Hero 6 (2014)",
             "slug":"big-hero-6-2014",
             "year":2014,
             "rating":7.8,
             "runtime":102,
             "genres":[  
                "Action",
                "Adventure",
                "Animation",
                "Comedy",
                "Drama",
                "Family",
                "Sci-Fi"
             ],
             "summary":"When a devastating event befalls the city of San Fransokyo and catapults Hiro into the midst of danger, he turns to Baymax and his close friends adrenaline junkie Go Go Tomago, neatnik Wasabi, chemistry whiz Honey Lemon and fanboy Fred. Determined to uncover the mystery, Hiro transforms his friends into a band of high-tech heroes called \"Big Hero 6.\"",
             "description_full":"When a devastating event befalls the city of San Fransokyo and catapults Hiro into the midst of danger, he turns to Baymax and his close friends adrenaline junkie Go Go Tomago, neatnik Wasabi, chemistry whiz Honey Lemon and fanboy Fred. Determined to uncover the mystery, Hiro transforms his friends into a band of high-tech heroes called \"Big Hero 6.\"",
             "synopsis":"When a devastating event befalls the city of San Fransokyo and catapults Hiro into the midst of danger, he turns to Baymax and his close friends adrenaline junkie Go Go Tomago, neatnik Wasabi, chemistry whiz Honey Lemon and fanboy Fred. Determined to uncover the mystery, Hiro transforms his friends into a band of high-tech heroes called \"Big Hero 6.\"",
             "yt_trailer_code":"bT8qmoCgxZg",
             "language":"English",
             "mpa_rating":"PG",
             "background_image":"https://yts.ag/assets/images/movies/big_hero_6_2014/background.jpg",
             "background_image_original":"https://yts.ag/assets/images/movies/big_hero_6_2014/background.jpg",
             "small_cover_image":"https://yts.ag/assets/images/movies/big_hero_6_2014/small-cover.jpg",
             "medium_cover_image":"https://yts.ag/assets/images/movies/big_hero_6_2014/medium-cover.jpg",
             "large_cover_image":"https://yts.ag/assets/images/movies/big_hero_6_2014/large-cover.jpg",
             "state":"ok",
             "torrents":[  
                {  
                   "url":"https://yts.ag/torrent/download/A65AEDD513AF84DF2A4AF6BAD8A8B0D08452411E",
                   "hash":"A65AEDD513AF84DF2A4AF6BAD8A8B0D08452411E",
                   "quality":"3D",
                   "seeds":30,
                   "peers":1,
                   "size":"1.65 GB",
                   "size_bytes":1771674010,
                   "date_uploaded":"2015-11-01 19:26:25",
                   "date_uploaded_unix":1446423985
                },
                {  
                   "url":"https://yts.ag/torrent/download/BB43CF1DC5B200BA37679DB96375A8190D933C2E",
                   "hash":"BB43CF1DC5B200BA37679DB96375A8190D933C2E",
                   "quality":"720p",
                   "seeds":190,
                   "peers":26,
                   "size":"810.17 MB",
                   "size_bytes":849524818,
                   "date_uploaded":"2015-10-31 21:58:07",
                   "date_uploaded_unix":1446343087
                },
                {  
                   "url":"https://yts.ag/torrent/download/966D30A8BBC61A1FB50842CAB6983B17ECA2CF9A",
                   "hash":"966D30A8BBC61A1FB50842CAB6983B17ECA2CF9A",
                   "quality":"1080p",
                   "seeds":463,
                   "peers":89,
                   "size":"1.65 GB",
                   "size_bytes":1771674010,
                   "date_uploaded":"2015-10-31 21:58:11",
                   "date_uploaded_unix":1446343091
                }
             ],
             "date_uploaded":"2015-10-31 21:58:07",
             "date_uploaded_unix":1446343087
          },
          {  
             "id":5252,
             "url":"https://yts.ag/movie/the-hunger-games-mockingjay-part-2-2015",
             "imdb_code":"tt1951266",
             "title":"The Hunger Games: Mockingjay - Part 2",
             "title_english":"The Hunger Games: Mockingjay - Part 2",
             "title_long":"The Hunger Games: Mockingjay - Part 2 (2015)",
             "slug":"the-hunger-games-mockingjay-part-2-2015",
             "year":2015,
             "rating":6.6,
             "runtime":137,
             "genres":[  
                "Action",
                "Adventure",
                "Sci-Fi",
                "Thriller",
                "War"
             ],
             "summary":"After young Katniss Everdeen agrees to be the symbol of rebellion, the Mockingjay, she tries to return Peeta to his normal state, tries to get to the Capitol, and tries to deal with the battles coming her way...but all for her main goal: assassinating President Snow and returning peace to the Districts of Panem. As her squad starts to get smaller and smaller, will she make it to the Capitol? Will she get revenge on Snow or will her target change? Will she be with her \"Star-Crossed Lover,\" Peeta, or her long-time friend, Gale? Deaths, bombs, bow and arrows, a love triangle, hope... What will happen?",
             "description_full":"After young Katniss Everdeen agrees to be the symbol of rebellion, the Mockingjay, she tries to return Peeta to his normal state, tries to get to the Capitol, and tries to deal with the battles coming her way...but all for her main goal: assassinating President Snow and returning peace to the Districts of Panem. As her squad starts to get smaller and smaller, will she make it to the Capitol? Will she get revenge on Snow or will her target change? Will she be with her \"Star-Crossed Lover,\" Peeta, or her long-time friend, Gale? Deaths, bombs, bow and arrows, a love triangle, hope... What will happen?",
             "synopsis":"After young Katniss Everdeen agrees to be the symbol of rebellion, the Mockingjay, she tries to return Peeta to his normal state, tries to get to the Capitol, and tries to deal with the battles coming her way...but all for her main goal: assassinating President Snow and returning peace to the Districts of Panem. As her squad starts to get smaller and smaller, will she make it to the Capitol? Will she get revenge on Snow or will her target change? Will she be with her \"Star-Crossed Lover,\" Peeta, or her long-time friend, Gale? Deaths, bombs, bow and arrows, a love triangle, hope... What will happen?",
             "yt_trailer_code":"KmYNkasYthg",
             "language":"English",
             "mpa_rating":"PG-13",
             "background_image":"https://yts.ag/assets/images/movies/the_hunger_games_mockingjay_part_2_2015/background.jpg",
             "background_image_original":"https://yts.ag/assets/images/movies/the_hunger_games_mockingjay_part_2_2015/background.jpg",
             "small_cover_image":"https://yts.ag/assets/images/movies/the_hunger_games_mockingjay_part_2_2015/small-cover.jpg",
             "medium_cover_image":"https://yts.ag/assets/images/movies/the_hunger_games_mockingjay_part_2_2015/medium-cover.jpg",
             "large_cover_image":"https://yts.ag/assets/images/movies/the_hunger_games_mockingjay_part_2_2015/large-cover.jpg",
             "state":"ok",
             "torrents":[  
                {  
                   "url":"https://yts.ag/torrent/download/D7ABAE8777CD77BDD0D1E9A7AB24AB20E3531DC2",
                   "hash":"D7ABAE8777CD77BDD0D1E9A7AB24AB20E3531DC2",
                   "quality":"3D",
                   "seeds":10,
                   "peers":3,
                   "size":"2.09 GB",
                   "size_bytes":2244120412,
                   "date_uploaded":"2016-04-30 05:09:51",
                   "date_uploaded_unix":1462007391
                },
                {  
                   "url":"https://yts.ag/torrent/download/647B653E77C3F2C5562C80B80DA746A1D1DC2AF7",
                   "hash":"647B653E77C3F2C5562C80B80DA746A1D1DC2AF7",
                   "quality":"720p",
                   "seeds":94,
                   "peers":25,
                   "size":"1006.65 MB",
                   "size_bytes":1055549030,
                   "date_uploaded":"2016-03-10 18:56:06",
                   "date_uploaded_unix":1457654166
                },
                {  
                   "url":"https://yts.ag/torrent/download/42FDF1AEEE3C641BE8C41BC1FEEDDF87A50CAE12",
                   "hash":"42FDF1AEEE3C641BE8C41BC1FEEDDF87A50CAE12",
                   "quality":"1080p",
                   "seeds":96,
                   "peers":34,
                   "size":"2.08 GB",
                   "size_bytes":2233382994,
                   "date_uploaded":"2016-03-10 23:28:30",
                   "date_uploaded_unix":1457670510
                }
             ],
             "date_uploaded":"2016-03-10 18:56:06",
             "date_uploaded_unix":1457654166
          },
          {  
             "id":5315,
             "url":"https://yts.ag/movie/star-wars-the-force-awakens-2015",
             "imdb_code":"tt2488496",
             "title":"Star Wars: The Force Awakens",
             "title_english":"Star Wars: The Force Awakens",
             "title_long":"Star Wars: The Force Awakens (2015)",
             "slug":"star-wars-the-force-awakens-2015",
             "year":2015,
             "rating":8.1,
             "runtime":136,
             "genres":[  
                "Action",
                "Adventure",
                "Fantasy",
                "Sci-Fi",
                "Thriller"
             ],
             "summary":"30 years after the defeat of Darth Vader and the Empire, Rey, a scavenger from the planet Jakku, finds a BB-8 droid that knows the whereabouts of the long lost Luke Skywalker. Rey, as well as a rogue stormtrooper and two smugglers, are thrown into the middle of a battle between the Resistance and the daunting legions of the First Order.",
             "description_full":"30 years after the defeat of Darth Vader and the Empire, Rey, a scavenger from the planet Jakku, finds a BB-8 droid that knows the whereabouts of the long lost Luke Skywalker. Rey, as well as a rogue stormtrooper and two smugglers, are thrown into the middle of a battle between the Resistance and the daunting legions of the First Order.",
             "synopsis":"30 years after the defeat of Darth Vader and the Empire, Rey, a scavenger from the planet Jakku, finds a BB-8 droid that knows the whereabouts of the long lost Luke Skywalker. Rey, as well as a rogue stormtrooper and two smugglers, are thrown into the middle of a battle between the Resistance and the daunting legions of the First Order.",
             "yt_trailer_code":"gAUxw4umkdY",
             "language":"English",
             "mpa_rating":"PG-13",
             "background_image":"https://yts.ag/assets/images/movies/star_wars_episode_vii_the_force_awakens_2015/background.jpg",
             "background_image_original":"https://yts.ag/assets/images/movies/star_wars_episode_vii_the_force_awakens_2015/background.jpg",
             "small_cover_image":"https://yts.ag/assets/images/movies/star_wars_episode_vii_the_force_awakens_2015/small-cover.jpg",
             "medium_cover_image":"https://yts.ag/assets/images/movies/star_wars_episode_vii_the_force_awakens_2015/medium-cover.jpg",
             "large_cover_image":"https://yts.ag/assets/images/movies/star_wars_episode_vii_the_force_awakens_2015/large-cover.jpg",
             "state":"ok",
             "torrents":[  
                {  
                   "url":"https://yts.ag/torrent/download/A0165676483620E236789E6D815A9F90492D0867",
                   "hash":"A0165676483620E236789E6D815A9F90492D0867",
                   "quality":"3D",
                   "seeds":34,
                   "peers":6,
                   "size":"2.11 GB",
                   "size_bytes":2265595249,
                   "date_uploaded":"2017-03-18 19:29:44",
                   "date_uploaded_unix":1489879784
                },
                {  
                   "url":"https://yts.ag/torrent/download/6D33001DD61BE4032AA73D0A193510AE7C4B4DCD",
                   "hash":"6D33001DD61BE4032AA73D0A193510AE7C4B4DCD",
                   "quality":"720p",
                   "seeds":187,
                   "peers":39,
                   "size":"1022.56 MB",
                   "size_bytes":1072231875,
                   "date_uploaded":"2016-03-23 12:20:17",
                   "date_uploaded_unix":1458750017
                },
                {  
                   "url":"https://yts.ag/torrent/download/423EED0C53F3857F66FCFB7522FB8C3829D1DCF4",
                   "hash":"423EED0C53F3857F66FCFB7522FB8C3829D1DCF4",
                   "quality":"1080p",
                   "seeds":312,
                   "peers":58,
                   "size":"2.11 GB",
                   "size_bytes":2265595249,
                   "date_uploaded":"2016-03-23 16:57:59",
                   "date_uploaded_unix":1458766679
                }
             ],
             "date_uploaded":"2016-03-23 12:20:17",
             "date_uploaded_unix":1458750017
          },
          {  
             "id":5385,
             "url":"https://yts.ag/movie/the-revenant-2015",
             "imdb_code":"tt1663202",
             "title":"The Revenant",
             "title_english":"The Revenant",
             "title_long":"The Revenant (2015)",
             "slug":"the-revenant-2015",
             "year":2015,
             "rating":8,
             "runtime":156,
             "genres":[  
                "Action",
                "Adventure",
                "Drama",
                "Thriller",
                "Western"
             ],
             "summary":"While exploring g uncharted wilderness in 1823, legendary fronjitiersman Hugh Glass sustains injuries from a brutal bear attack. When his hunting team leaves him for dead, Glass must utilize his survival skills to find a way back home while avoiding natives on their own hunt. Grief-stricken and fueled by vengeance, Glass treks through the wintry terrain to track down John Fitzgerald, the former confidant who betrayed and abandoned him.",
             "description_full":"While exploring g uncharted wilderness in 1823, legendary fronjitiersman Hugh Glass sustains injuries from a brutal bear attack. When his hunting team leaves him for dead, Glass must utilize his survival skills to find a way back home while avoiding natives on their own hunt. Grief-stricken and fueled by vengeance, Glass treks through the wintry terrain to track down John Fitzgerald, the former confidant who betrayed and abandoned him.",
             "synopsis":"While exploring g uncharted wilderness in 1823, legendary fronjitiersman Hugh Glass sustains injuries from a brutal bear attack. When his hunting team leaves him for dead, Glass must utilize his survival skills to find a way back home while avoiding natives on their own hunt. Grief-stricken and fueled by vengeance, Glass treks through the wintry terrain to track down John Fitzgerald, the former confidant who betrayed and abandoned him.",
             "yt_trailer_code":"LoebZZ8K5N0",
             "language":"English",
             "mpa_rating":"R",
             "background_image":"https://yts.ag/assets/images/movies/the_revenant_2015/background.jpg",
             "background_image_original":"https://yts.ag/assets/images/movies/the_revenant_2015/background.jpg",
             "small_cover_image":"https://yts.ag/assets/images/movies/the_revenant_2015/small-cover.jpg",
             "medium_cover_image":"https://yts.ag/assets/images/movies/the_revenant_2015/medium-cover.jpg",
             "large_cover_image":"https://yts.ag/assets/images/movies/the_revenant_2015/large-cover.jpg",
             "state":"ok",
             "torrents":[  
                {  
                   "url":"https://yts.ag/torrent/download/CBD21C97A839851A53CF1230E968FF373FE9A63E",
                   "hash":"CBD21C97A839851A53CF1230E968FF373FE9A63E",
                   "quality":"720p",
                   "seeds":260,
                   "peers":31,
                   "size":"1.13 GB",
                   "size_bytes":1213328261,
                   "date_uploaded":"2016-04-09 18:37:27",
                   "date_uploaded_unix":1460241447
                },
                {  
                   "url":"https://yts.ag/torrent/download/931A5BC5CE3767168D00F92A2E4CFFE472B9CE54",
                   "hash":"931A5BC5CE3767168D00F92A2E4CFFE472B9CE54",
                   "quality":"1080p",
                   "seeds":308,
                   "peers":37,
                   "size":"2.39 GB",
                   "size_bytes":2566242959,
                   "date_uploaded":"2016-04-09 23:01:30",
                   "date_uploaded_unix":1460257290
                }
             ],
             "date_uploaded":"2016-04-09 18:37:27",
             "date_uploaded_unix":1460241447
          },
          {  
             "id":6336,
             "url":"https://yts.ag/movie/doctor-strange-2016",
             "imdb_code":"tt1211837",
             "title":"Doctor Strange",
             "title_english":"Doctor Strange",
             "title_long":"Doctor Strange (2016)",
             "slug":"doctor-strange-2016",
             "year":2016,
             "rating":7.5,
             "runtime":115,
             "genres":[  
                "Action",
                "Adventure",
                "Fantasy",
                "Sci-Fi"
             ],
             "summary":"Marvel's \"Doctor Strange\" follows the story of the talented neurosurgeon Doctor Stephen Strange who, after a tragic car accident, must put ego aside and learn the secrets of a hidden world of mysticism and alternate dimensions. Based in New York City's Greenwich Village, Doctor Strange must act as an intermediary between the real world and what lies beyond, utilising a vast array of metaphysical abilities and artifacts to protect the Marvel Cinematic Universe.",
             "description_full":"Marvel's \"Doctor Strange\" follows the story of the talented neurosurgeon Doctor Stephen Strange who, after a tragic car accident, must put ego aside and learn the secrets of a hidden world of mysticism and alternate dimensions. Based in New York City's Greenwich Village, Doctor Strange must act as an intermediary between the real world and what lies beyond, utilising a vast array of metaphysical abilities and artifacts to protect the Marvel Cinematic Universe.",
             "synopsis":"Marvel's \"Doctor Strange\" follows the story of the talented neurosurgeon Doctor Stephen Strange who, after a tragic car accident, must put ego aside and learn the secrets of a hidden world of mysticism and alternate dimensions. Based in New York City's Greenwich Village, Doctor Strange must act as an intermediary between the real world and what lies beyond, utilising a vast array of metaphysical abilities and artifacts to protect the Marvel Cinematic Universe.",
             "yt_trailer_code":"HSzx-zryEgM",
             "language":"English",
             "mpa_rating":"PG-13",
             "background_image":"https://yts.ag/assets/images/movies/doctor_strange_2016/background.jpg",
             "background_image_original":"https://yts.ag/assets/images/movies/doctor_strange_2016/background.jpg",
             "small_cover_image":"https://yts.ag/assets/images/movies/doctor_strange_2016/small-cover.jpg",
             "medium_cover_image":"https://yts.ag/assets/images/movies/doctor_strange_2016/medium-cover.jpg",
             "large_cover_image":"https://yts.ag/assets/images/movies/doctor_strange_2016/large-cover.jpg",
             "state":"ok",
             "torrents":[  
                {  
                   "url":"https://yts.ag/torrent/download/18566013BD5286AB1B155C809799820E043135AA",
                   "hash":"18566013BD5286AB1B155C809799820E043135AA",
                   "quality":"3D",
                   "seeds":49,
                   "peers":12,
                   "size":"1.76 GB",
                   "size_bytes":1889785610,
                   "date_uploaded":"2017-02-28 00:31:26",
                   "date_uploaded_unix":1488259886
                },
                {  
                   "url":"https://yts.ag/torrent/download/AFA238A8D953B6256D94FCF6D183917F5110E6F4",
                   "hash":"AFA238A8D953B6256D94FCF6D183917F5110E6F4",
                   "quality":"720p",
                   "seeds":753,
                   "peers":76,
                   "size":"844.93 MB",
                   "size_bytes":885973320,
                   "date_uploaded":"2017-02-15 19:52:39",
                   "date_uploaded_unix":1487206359
                },
                {  
                   "url":"https://yts.ag/torrent/download/7BA0C6BD9B4E52EA2AD137D02394DE7D83B98091",
                   "hash":"7BA0C6BD9B4E52EA2AD137D02394DE7D83B98091",
                   "quality":"1080p",
                   "seeds":1357,
                   "peers":159,
                   "size":"1.75 GB",
                   "size_bytes":1879048192,
                   "date_uploaded":"2017-02-15 22:01:48",
                   "date_uploaded_unix":1487214108
                }
             ],
             "date_uploaded":"2017-02-15 19:52:39",
             "date_uploaded_unix":1487206359
          },
          {  
             "id":6339,
             "url":"https://yts.ag/movie/moana-2016",
             "imdb_code":"tt3521164",
             "title":"Moana",
             "title_english":"Moana",
             "title_long":"Moana (2016)",
             "slug":"moana-2016",
             "year":2016,
             "rating":7.6,
             "runtime":107,
             "genres":[  
                "Action",
                "Adventure",
                "Animation",
                "Comedy",
                "Family",
                "Fantasy",
                "Musical",
                "Thriller"
             ],
             "summary":"Moana Waialiki is a sea voyaging enthusiast and the only daughter of a chief in a long line of navigators. When her island's fishermen can't catch any fish and the crops fail, she learns that the demigod Maui caused the blight by stealing the heart of the goddess, Te Fiti. The only way to heal the island is to persuade Maui to return Te Fiti's heart, so Moana sets off on an epic journey across the Pacific. The film is based on stories from Polynesian mythology.",
             "description_full":"Moana Waialiki is a sea voyaging enthusiast and the only daughter of a chief in a long line of navigators. When her island's fishermen can't catch any fish and the crops fail, she learns that the demigod Maui caused the blight by stealing the heart of the goddess, Te Fiti. The only way to heal the island is to persuade Maui to return Te Fiti's heart, so Moana sets off on an epic journey across the Pacific. The film is based on stories from Polynesian mythology.",
             "synopsis":"Moana Waialiki is a sea voyaging enthusiast and the only daughter of a chief in a long line of navigators. When her island's fishermen can't catch any fish and the crops fail, she learns that the demigod Maui caused the blight by stealing the heart of the goddess, Te Fiti. The only way to heal the island is to persuade Maui to return Te Fiti's heart, so Moana sets off on an epic journey across the Pacific. The film is based on stories from Polynesian mythology.",
             "yt_trailer_code":"LKFuXETZUsI",
             "language":"English",
             "mpa_rating":"PG",
             "background_image":"https://yts.ag/assets/images/movies/moana_2016/background.jpg",
             "background_image_original":"https://yts.ag/assets/images/movies/moana_2016/background.jpg",
             "small_cover_image":"https://yts.ag/assets/images/movies/moana_2016/small-cover.jpg",
             "medium_cover_image":"https://yts.ag/assets/images/movies/moana_2016/medium-cover.jpg",
             "large_cover_image":"https://yts.ag/assets/images/movies/moana_2016/large-cover.jpg",
             "state":"ok",
             "torrents":[  
                {  
                   "url":"https://yts.ag/torrent/download/298400F2032241DAB34836BC2165C30788211C9F",
                   "hash":"298400F2032241DAB34836BC2165C30788211C9F",
                   "quality":"3D",
                   "seeds":46,
                   "peers":15,
                   "size":"1.64 GB",
                   "size_bytes":1760936591,
                   "date_uploaded":"2017-02-28 02:31:58",
                   "date_uploaded_unix":1488267118
                },
                {  
                   "url":"https://yts.ag/torrent/download/749E77BBFEBD97E689C132E3B663BB89425476DC",
                   "hash":"749E77BBFEBD97E689C132E3B663BB89425476DC",
                   "quality":"720p",
                   "seeds":1498,
                   "peers":147,
                   "size":"789.58 MB",
                   "size_bytes":827934638,
                   "date_uploaded":"2017-02-17 18:40:03",
                   "date_uploaded_unix":1487374803
                },
                {  
                   "url":"https://yts.ag/torrent/download/635F4FE104291989E433EF7100C33F6106E85007",
                   "hash":"635F4FE104291989E433EF7100C33F6106E85007",
                   "quality":"1080p",
                   "seeds":800,
                   "peers":129,
                   "size":"1.63 GB",
                   "size_bytes":1750199173,
                   "date_uploaded":"2017-02-17 20:33:17",
                   "date_uploaded_unix":1487381597
                }
             ],
             "date_uploaded":"2017-02-17 18:40:03",
             "date_uploaded_unix":1487374803
          },
          {  
             "id":6356,
             "url":"https://yts.ag/movie/fantastic-beasts-and-where-to-find-them-2016",
             "imdb_code":"tt3183660",
             "title":"Fantastic Beasts and Where to Find Them",
             "title_english":"Fantastic Beasts and Where to Find Them",
             "title_long":"Fantastic Beasts and Where to Find Them (2016)",
             "slug":"fantastic-beasts-and-where-to-find-them-2016",
             "year":2016,
             "rating":7.4,
             "runtime":133,
             "genres":[  
                "Adventure",
                "Family",
                "Fantasy"
             ],
             "summary":"Holding a mysterious leather suitcase in his hand, Newt Scamander, a young activist wizard from England, visits New York while he is on his way to Arizona. Inside his expanding suitcase hides a wide array of diverse, magical creatures that exist among us, ranging from tiny, twig-like ones, to majestic and humongous ones. It is the middle of the 20s and times are troubled since the already fragile equilibrium of secrecy between the unseen world of wizards and the ordinary or \"No-Maj\" people that the MACUSA Congress struggles to maintain, is at risk of being unsettled. In the meantime, the voices against wizardry keep growing with daily protests led by Mary Lou Barebone and fuelled by the increasing disasters ascribed to a dark wizard, Gellert Grindelwald. At the same time, by a twist of fate, Newt's precious suitcase will be switched with the identical one of an aspiring No-Maj baker, Jacob Kowalski, while demoted Auror, Tina Goldstein, arrests Newt for being an unregistered wizard. To...",
             "description_full":"Holding a mysterious leather suitcase in his hand, Newt Scamander, a young activist wizard from England, visits New York while he is on his way to Arizona. Inside his expanding suitcase hides a wide array of diverse, magical creatures that exist among us, ranging from tiny, twig-like ones, to majestic and humongous ones. It is the middle of the 20s and times are troubled since the already fragile equilibrium of secrecy between the unseen world of wizards and the ordinary or \"No-Maj\" people that the MACUSA Congress struggles to maintain, is at risk of being unsettled. In the meantime, the voices against wizardry keep growing with daily protests led by Mary Lou Barebone and fuelled by the increasing disasters ascribed to a dark wizard, Gellert Grindelwald. At the same time, by a twist of fate, Newt's precious suitcase will be switched with the identical one of an aspiring No-Maj baker, Jacob Kowalski, while demoted Auror, Tina Goldstein, arrests Newt for being an unregistered wizard. To...",
             "synopsis":"Holding a mysterious leather suitcase in his hand, Newt Scamander, a young activist wizard from England, visits New York while he is on his way to Arizona. Inside his expanding suitcase hides a wide array of diverse, magical creatures that exist among us, ranging from tiny, twig-like ones, to majestic and humongous ones. It is the middle of the 20s and times are troubled since the already fragile equilibrium of secrecy between the unseen world of wizards and the ordinary or \"No-Maj\" people that the MACUSA Congress struggles to maintain, is at risk of being unsettled. In the meantime, the voices against wizardry keep growing with daily protests led by Mary Lou Barebone and fuelled by the increasing disasters ascribed to a dark wizard, Gellert Grindelwald. At the same time, by a twist of fate, Newt's precious suitcase will be switched with the identical one of an aspiring No-Maj baker, Jacob Kowalski, while demoted Auror, Tina Goldstein, arrests Newt for being an unregistered wizard. To...",
             "yt_trailer_code":"8rSjlqBYba4",
             "language":"English",
             "mpa_rating":"PG-13",
             "background_image":"https://yts.ag/assets/images/movies/fantastic_beasts_and_where_to_find_them_2016/background.jpg",
             "background_image_original":"https://yts.ag/assets/images/movies/fantastic_beasts_and_where_to_find_them_2016/background.jpg",
             "small_cover_image":"https://yts.ag/assets/images/movies/fantastic_beasts_and_where_to_find_them_2016/small-cover.jpg",
             "medium_cover_image":"https://yts.ag/assets/images/movies/fantastic_beasts_and_where_to_find_them_2016/medium-cover.jpg",
             "large_cover_image":"https://yts.ag/assets/images/movies/fantastic_beasts_and_where_to_find_them_2016/large-cover.jpg",
             "state":"ok",
             "torrents":[  
                {  
                   "url":"https://yts.ag/torrent/download/ACAB5A8F2923AFD552FB22F360279738B0EF4FEB",
                   "hash":"ACAB5A8F2923AFD552FB22F360279738B0EF4FEB",
                   "quality":"3D",
                   "seeds":45,
                   "peers":14,
                   "size":"2.03 GB",
                   "size_bytes":2179695903,
                   "date_uploaded":"2017-03-14 16:16:27",
                   "date_uploaded_unix":1489522587
                },
                {  
                   "url":"https://yts.ag/torrent/download/5EF0DA95695935FC2CB49078BB62BE7CDB5C4BDA",
                   "hash":"5EF0DA95695935FC2CB49078BB62BE7CDB5C4BDA",
                   "quality":"720p",
                   "seeds":618,
                   "peers":84,
                   "size":"988.3 MB",
                   "size_bytes":1036307661,
                   "date_uploaded":"2017-02-25 13:54:43",
                   "date_uploaded_unix":1488048883
                },
                {  
                   "url":"https://yts.ag/torrent/download/945A012C70375ED7C08296E3215A506E221B2BEB",
                   "hash":"945A012C70375ED7C08296E3215A506E221B2BEB",
                   "quality":"1080p",
                   "seeds":636,
                   "peers":97,
                   "size":"2.03 GB",
                   "size_bytes":2179695903,
                   "date_uploaded":"2017-02-25 16:24:07",
                   "date_uploaded_unix":1488057847
                }
             ],
             "date_uploaded":"2017-02-25 13:54:43",
             "date_uploaded_unix":1488048883
          },
          {  
             "id":1098,
             "url":"https://yts.ag/movie/ex-machina-2014",
             "imdb_code":"tt0470752",
             "title":"Ex Machina",
             "title_english":"Ex Machina",
             "title_long":"Ex Machina (2014)",
             "slug":"ex-machina-2014",
             "year":2014,
             "rating":7.7,
             "runtime":108,
             "genres":[  
                "Action",
                "Drama",
                "Mystery",
                "Sci-Fi",
                "Thriller"
             ],
             "summary":"Caleb, a 26 year old programmer at the world's largest internet company, wins a competition to spend a week at a private mountain retreat belonging to Nathan, the reclusive CEO of the company. But when Caleb arrives at the remote location he finds that he will have to participate in a strange and fascinating experiment in which he must interact with the world's first true artificial intelligence, housed in the body of a beautiful robot girl.",
             "description_full":"Caleb, a 26 year old programmer at the world's largest internet company, wins a competition to spend a week at a private mountain retreat belonging to Nathan, the reclusive CEO of the company. But when Caleb arrives at the remote location he finds that he will have to participate in a strange and fascinating experiment in which he must interact with the world's first true artificial intelligence, housed in the body of a beautiful robot girl.",
             "synopsis":"Caleb, a 26 year old programmer at the world's largest internet company, wins a competition to spend a week at a private mountain retreat belonging to Nathan, the reclusive CEO of the company. But when Caleb arrives at the remote location he finds that he will have to participate in a strange and fascinating experiment in which he must interact with the world's first true artificial intelligence, housed in the body of a beautiful robot girl.",
             "yt_trailer_code":"_vsmiWg3ekE",
             "language":"English",
             "mpa_rating":"R",
             "background_image":"https://yts.ag/assets/images/movies/ex_machina_2015/background.jpg",
             "background_image_original":"https://yts.ag/assets/images/movies/ex_machina_2015/background.jpg",
             "small_cover_image":"https://yts.ag/assets/images/movies/ex_machina_2015/small-cover.jpg",
             "medium_cover_image":"https://yts.ag/assets/images/movies/ex_machina_2015/medium-cover.jpg",
             "large_cover_image":"https://yts.ag/assets/images/movies/ex_machina_2015/large-cover.jpg",
             "state":"ok",
             "torrents":[  
                {  
                   "url":"https://yts.ag/torrent/download/12A3CD62C204C82687C1DCDD66976F11946586EB",
                   "hash":"12A3CD62C204C82687C1DCDD66976F11946586EB",
                   "quality":"720p",
                   "seeds":249,
                   "peers":24,
                   "size":"808.19 MB",
                   "size_bytes":847448637,
                   "date_uploaded":"2015-10-31 23:19:37",
                   "date_uploaded_unix":1446347977
                },
                {  
                   "url":"https://yts.ag/torrent/download/31FF6C7F8AF99BDBC2D5F022367BC6B85BD613EE",
                   "hash":"31FF6C7F8AF99BDBC2D5F022367BC6B85BD613EE",
                   "quality":"1080p",
                   "seeds":618,
                   "peers":49,
                   "size":"1.63 GB",
                   "size_bytes":1750199173,
                   "date_uploaded":"2015-10-31 23:19:41",
                   "date_uploaded_unix":1446347981
                }
             ],
             "date_uploaded":"2015-10-31 23:19:37",
             "date_uploaded_unix":1446347977
          },
          {  
             "id":6381,
             "url":"https://yts.ag/movie/rogue-one-2016",
             "imdb_code":"tt3748528",
             "title":"Rogue One",
             "title_english":"Rogue One",
             "title_long":"Rogue One (2016)",
             "slug":"rogue-one-2016",
             "year":2016,
             "rating":7.9,
             "runtime":133,
             "genres":[  
                "Action",
                "Adventure",
                "Sci-Fi"
             ],
             "summary":"All looks lost for the Rebellion against the Empire as they learn of the existence of a new super weapon, the Death Star. Once a possible weakness in its construction is uncovered, the Rebel Alliance must set out on a desperate mission to steal the plans for the Death Star. The future of the entire galaxy now rests upon its success.",
             "description_full":"All looks lost for the Rebellion against the Empire as they learn of the existence of a new super weapon, the Death Star. Once a possible weakness in its construction is uncovered, the Rebel Alliance must set out on a desperate mission to steal the plans for the Death Star. The future of the entire galaxy now rests upon its success.",
             "synopsis":"All looks lost for the Rebellion against the Empire as they learn of the existence of a new super weapon, the Death Star. Once a possible weakness in its construction is uncovered, the Rebel Alliance must set out on a desperate mission to steal the plans for the Death Star. The future of the entire galaxy now rests upon its success.",
             "yt_trailer_code":"frdj1zb9sMY",
             "language":"English",
             "mpa_rating":"PG-13",
             "background_image":"https://yts.ag/assets/images/movies/rogue_one_2016/background.jpg",
             "background_image_original":"https://yts.ag/assets/images/movies/rogue_one_2016/background.jpg",
             "small_cover_image":"https://yts.ag/assets/images/movies/rogue_one_2016/small-cover.jpg",
             "medium_cover_image":"https://yts.ag/assets/images/movies/rogue_one_2016/medium-cover.jpg",
             "large_cover_image":"https://yts.ag/assets/images/movies/rogue_one_2016/large-cover.jpg",
             "state":"ok",
             "torrents":[  
                {  
                   "url":"https://yts.ag/torrent/download/4BCD318E25E04C6A32CB1ADCCAD3267E8AA62F3B",
                   "hash":"4BCD318E25E04C6A32CB1ADCCAD3267E8AA62F3B",
                   "quality":"3D",
                   "seeds":52,
                   "peers":12,
                   "size":"2.05 GB",
                   "size_bytes":2201170739,
                   "date_uploaded":"2017-04-02 01:39:05",
                   "date_uploaded_unix":1491111545
                },
                {  
                   "url":"https://yts.ag/torrent/download/4EFBD93BE04228A5D8E51CC19D8CD405E209DB1A",
                   "hash":"4EFBD93BE04228A5D8E51CC19D8CD405E209DB1A",
                   "quality":"720p",
                   "seeds":439,
                   "peers":65,
                   "size":"994.48 MB",
                   "size_bytes":1042787860,
                   "date_uploaded":"2017-03-18 13:58:47",
                   "date_uploaded_unix":1489859927
                },
                {  
                   "url":"https://yts.ag/torrent/download/FC9B4318E4D45FF9B52E60D28177D58BC573CC0D",
                   "hash":"FC9B4318E4D45FF9B52E60D28177D58BC573CC0D",
                   "quality":"1080p",
                   "seeds":1292,
                   "peers":133,
                   "size":"2.05 GB",
                   "size_bytes":2201170739,
                   "date_uploaded":"2017-03-18 16:46:21",
                   "date_uploaded_unix":1489869981
                }
             ],
             "date_uploaded":"2017-03-18 13:58:47",
             "date_uploaded_unix":1489859927
          },
          {  
             "id":6200,
             "url":"https://yts.ag/movie/suicide-squad-2016",
             "imdb_code":"tt1386697",
             "title":"Suicide Squad",
             "title_english":"Suicide Squad",
             "title_long":"Suicide Squad (2016)",
             "slug":"suicide-squad-2016",
             "year":2016,
             "rating":6.2,
             "runtime":123,
             "genres":[  
                "Action",
                "Adventure",
                "Fantasy",
                "Sci-Fi"
             ],
             "summary":"It feels good to be bad...Assemble a team of the world's most dangerous, incarcerated Super Villains, provide them with the most powerful arsenal at the government's disposal, and send them off on a mission to defeat an enigmatic, insuperable entity. U.S. intelligence officer Amanda Waller has determined only a secretly convened group of disparate, despicable individuals with next to nothing to lose will do. However, once they realize they weren't picked to succeed but chosen for their patent culpability when they inevitably fail, will the Suicide Squad resolve to die trying, or decide it's every man for himself?",
             "description_full":"It feels good to be bad...Assemble a team of the world's most dangerous, incarcerated Super Villains, provide them with the most powerful arsenal at the government's disposal, and send them off on a mission to defeat an enigmatic, insuperable entity. U.S. intelligence officer Amanda Waller has determined only a secretly convened group of disparate, despicable individuals with next to nothing to lose will do. However, once they realize they weren't picked to succeed but chosen for their patent culpability when they inevitably fail, will the Suicide Squad resolve to die trying, or decide it's every man for himself?",
             "synopsis":"It feels good to be bad...Assemble a team of the world's most dangerous, incarcerated Super Villains, provide them with the most powerful arsenal at the government's disposal, and send them off on a mission to defeat an enigmatic, insuperable entity. U.S. intelligence officer Amanda Waller has determined only a secretly convened group of disparate, despicable individuals with next to nothing to lose will do. However, once they realize they weren't picked to succeed but chosen for their patent culpability when they inevitably fail, will the Suicide Squad resolve to die trying, or decide it's every man for himself?",
             "yt_trailer_code":"mMb-RrhTxIE",
             "language":"English",
             "mpa_rating":"PG-13",
             "background_image":"https://yts.ag/assets/images/movies/suicide_squad_2016/background.jpg",
             "background_image_original":"https://yts.ag/assets/images/movies/suicide_squad_2016/background.jpg",
             "small_cover_image":"https://yts.ag/assets/images/movies/suicide_squad_2016/small-cover.jpg",
             "medium_cover_image":"https://yts.ag/assets/images/movies/suicide_squad_2016/medium-cover.jpg",
             "large_cover_image":"https://yts.ag/assets/images/movies/suicide_squad_2016/large-cover.jpg",
             "state":"ok",
             "torrents":[  
                {  
                   "url":"https://yts.ag/torrent/download/BBB9193BA9BACEF6F14F2D59B4F528AA239B9DE7",
                   "hash":"BBB9193BA9BACEF6F14F2D59B4F528AA239B9DE7",
                   "quality":"3D",
                   "seeds":28,
                   "peers":14,
                   "size":"1.88 GB",
                   "size_bytes":2018634629,
                   "date_uploaded":"2017-03-17 19:52:35",
                   "date_uploaded_unix":1489794755
                },
                {  
                   "url":"https://yts.ag/torrent/download/567E9F3DDB2802E75B88532FE315FA6391991763",
                   "hash":"567E9F3DDB2802E75B88532FE315FA6391991763",
                   "quality":"720p",
                   "seeds":763,
                   "peers":94,
                   "size":"999.95 MB",
                   "size_bytes":1048523571,
                   "date_uploaded":"2016-11-29 13:20:19",
                   "date_uploaded_unix":1480443619
                },
                {  
                   "url":"https://yts.ag/torrent/download/8DCEC817168702F38B707519356FE6E5A8367341",
                   "hash":"8DCEC817168702F38B707519356FE6E5A8367341",
                   "quality":"1080p",
                   "seeds":631,
                   "peers":77,
                   "size":"2.06 GB",
                   "size_bytes":2211908157,
                   "date_uploaded":"2016-11-29 15:56:45",
                   "date_uploaded_unix":1480453005
                }
             ],
             "date_uploaded":"2016-11-29 13:20:19",
             "date_uploaded_unix":1480443619
          },
          {  
             "id":1632,
             "url":"https://yts.ag/movie/interstellar-2014",
             "imdb_code":"tt0816692",
             "title":"Interstellar",
             "title_english":"Interstellar",
             "title_long":"Interstellar (2014)",
             "slug":"interstellar-2014",
             "year":2014,
             "rating":8.6,
             "runtime":169,
             "genres":[  
                "Action",
                "Adventure",
                "Drama",
                "Sci-Fi"
             ],
             "summary":"Earth's future has been riddled by disasters, famines, and droughts. There is only one way to ensure mankind's survival: Interstellar travel. A newly discovered wormhole in the far reaches of our solar system allows a team of astronauts to go where no man has gone before, a planet that may have the right environment to sustain human life.",
             "description_full":"Earth's future has been riddled by disasters, famines, and droughts. There is only one way to ensure mankind's survival: Interstellar travel. A newly discovered wormhole in the far reaches of our solar system allows a team of astronauts to go where no man has gone before, a planet that may have the right environment to sustain human life.",
             "synopsis":"Earth's future has been riddled by disasters, famines, and droughts. There is only one way to ensure mankind's survival: Interstellar travel. A newly discovered wormhole in the far reaches of our solar system allows a team of astronauts to go where no man has gone before, a planet that may have the right environment to sustain human life.",
             "yt_trailer_code":"Lm8p5rlrSkY",
             "language":"English",
             "mpa_rating":"PG-13",
             "background_image":"https://yts.ag/assets/images/movies/interstellar_2014/background.jpg",
             "background_image_original":"https://yts.ag/assets/images/movies/interstellar_2014/background.jpg",
             "small_cover_image":"https://yts.ag/assets/images/movies/interstellar_2014/small-cover.jpg",
             "medium_cover_image":"https://yts.ag/assets/images/movies/interstellar_2014/medium-cover.jpg",
             "large_cover_image":"https://yts.ag/assets/images/movies/interstellar_2014/large-cover.jpg",
             "state":"ok",
             "torrents":[  
                {  
                   "url":"https://yts.ag/torrent/download/6E88B3F25BA49D483D740A652BF013C341BC5373",
                   "hash":"6E88B3F25BA49D483D740A652BF013C341BC5373",
                   "quality":"720p",
                   "seeds":562,
                   "peers":54,
                   "size":"1.02 GB",
                   "size_bytes":1095216660,
                   "date_uploaded":"2015-11-01 00:18:06",
                   "date_uploaded_unix":1446351486
                },
                {  
                   "url":"https://yts.ag/torrent/download/89599BF4DC369A3A8ECA26411C5CCF922D78B486",
                   "hash":"89599BF4DC369A3A8ECA26411C5CCF922D78B486",
                   "quality":"1080p",
                   "seeds":1527,
                   "peers":133,
                   "size":"2.26 GB",
                   "size_bytes":2426656522,
                   "date_uploaded":"2015-11-01 00:18:07",
                   "date_uploaded_unix":1446351487
                }
             ],
             "date_uploaded":"2015-11-01 00:18:06",
             "date_uploaded_unix":1446351486
          },
          {  
             "id":6498,
             "url":"https://yts.ag/movie/beauty-and-the-beast-2017",
             "imdb_code":"tt2771200",
             "title":"Beauty and the Beast",
             "title_english":"Beauty and the Beast",
             "title_long":"Beauty and the Beast (2017)",
             "slug":"beauty-and-the-beast-2017",
             "year":2017,
             "rating":7.3,
             "runtime":129,
             "genres":[  
                "Action",
                "Family",
                "Fantasy",
                "Musical",
                "Romance"
             ],
             "summary":"Disney's animated classic takes on a new form, with a widened mythology and an all-star cast. A young prince, imprisoned in the form of a beast, can be freed only by true love. What may be his only opportunity arrives when he meets Belle, the only human girl to ever visit the castle since it was enchanted.",
             "description_full":"Disney's animated classic takes on a new form, with a widened mythology and an all-star cast. A young prince, imprisoned in the form of a beast, can be freed only by true love. What may be his only opportunity arrives when he meets Belle, the only human girl to ever visit the castle since it was enchanted.",
             "synopsis":"Disney's animated classic takes on a new form, with a widened mythology and an all-star cast. A young prince, imprisoned in the form of a beast, can be freed only by true love. What may be his only opportunity arrives when he meets Belle, the only human girl to ever visit the castle since it was enchanted.",
             "yt_trailer_code":"OvW_L8sTu5E",
             "language":"English",
             "mpa_rating":"PG",
             "background_image":"https://yts.ag/assets/images/movies/beauty_and_the_beast_2017/background.jpg",
             "background_image_original":"https://yts.ag/assets/images/movies/beauty_and_the_beast_2017/background.jpg",
             "small_cover_image":"https://yts.ag/assets/images/movies/beauty_and_the_beast_2017/small-cover.jpg",
             "medium_cover_image":"https://yts.ag/assets/images/movies/beauty_and_the_beast_2017/medium-cover.jpg",
             "large_cover_image":"https://yts.ag/assets/images/movies/beauty_and_the_beast_2017/large-cover.jpg",
             "state":"ok",
             "torrents":[  
                {  
                   "url":"https://yts.ag/torrent/download/DE30CE63F00FFA120CB06AEF9679ED354DE0CC10",
                   "hash":"DE30CE63F00FFA120CB06AEF9679ED354DE0CC10",
                   "quality":"3D",
                   "seeds":71,
                   "peers":17,
                   "size":"1.97 GB",
                   "size_bytes":2115271393,
                   "date_uploaded":"2017-06-17 07:20:35",
                   "date_uploaded_unix":1497698435
                },
                {  
                   "url":"https://yts.ag/torrent/download/9FE16486D3AD63B7AE7C5CE67028FABD5A74921B",
                   "hash":"9FE16486D3AD63B7AE7C5CE67028FABD5A74921B",
                   "quality":"720p",
                   "seeds":1512,
                   "peers":149,
                   "size":"947.05 MB",
                   "size_bytes":993053901,
                   "date_uploaded":"2017-05-19 05:26:21",
                   "date_uploaded_unix":1495185981
                },
                {  
                   "url":"https://yts.ag/torrent/download/1BE839B8032095048F5F7945081A3349232126A1",
                   "hash":"1BE839B8032095048F5F7945081A3349232126A1",
                   "quality":"1080p",
                   "seeds":2947,
                   "peers":448,
                   "size":"1.96 GB",
                   "size_bytes":2104533975,
                   "date_uploaded":"2017-05-19 07:56:44",
                   "date_uploaded_unix":1495195004
                }
             ],
             "date_uploaded":"2017-05-19 05:26:21",
             "date_uploaded_unix":1495185981
          },
          {  
             "id":6668,
             "url":"https://yts.ag/movie/guardians-of-the-galaxy-vol-2-2017",
             "imdb_code":"tt3896198",
             "title":"Guardians of the Galaxy Vol. 2",
             "title_english":"Guardians of the Galaxy Vol. 2",
             "title_long":"Guardians of the Galaxy Vol. 2 (2017)",
             "slug":"guardians-of-the-galaxy-vol-2-2017",
             "year":2017,
             "rating":7.8,
             "runtime":136,
             "genres":[  
                "Action",
                "Adventure",
                "Sci-Fi"
             ],
             "summary":"After saving Xandar from Ronan's wrath, the Guardians are now recognized as heroes. Now the team must help their leader Star Lord (Chris Pratt) uncover the truth behind his true heritage. Along the way, old foes turn to allies and betrayal is blooming. And the Guardians find that they are up against a devastating new menace who is out to rule the galaxy.",
             "description_full":"After saving Xandar from Ronan's wrath, the Guardians are now recognized as heroes. Now the team must help their leader Star Lord (Chris Pratt) uncover the truth behind his true heritage. Along the way, old foes turn to allies and betrayal is blooming. And the Guardians find that they are up against a devastating new menace who is out to rule the galaxy.",
             "synopsis":"After saving Xandar from Ronan's wrath, the Guardians are now recognized as heroes. Now the team must help their leader Star Lord (Chris Pratt) uncover the truth behind his true heritage. Along the way, old foes turn to allies and betrayal is blooming. And the Guardians find that they are up against a devastating new menace who is out to rule the galaxy.",
             "yt_trailer_code":"2cv2ueYnKjg",
             "language":"English",
             "mpa_rating":"PG-13",
             "background_image":"https://yts.ag/assets/images/movies/guardians_of_the_galaxy_vol_2_2017/background.jpg",
             "background_image_original":"https://yts.ag/assets/images/movies/guardians_of_the_galaxy_vol_2_2017/background.jpg",
             "small_cover_image":"https://yts.ag/assets/images/movies/guardians_of_the_galaxy_vol_2_2017/small-cover.jpg",
             "medium_cover_image":"https://yts.ag/assets/images/movies/guardians_of_the_galaxy_vol_2_2017/medium-cover.jpg",
             "large_cover_image":"https://yts.ag/assets/images/movies/guardians_of_the_galaxy_vol_2_2017/large-cover.jpg",
             "state":"ok",
             "torrents":[  
                {  
                   "url":"https://yts.ag/torrent/download/AE3DABF527C92A7A837379464A20F61A1A51F9B1",
                   "hash":"AE3DABF527C92A7A837379464A20F61A1A51F9B1",
                   "quality":"3D",
                   "seeds":124,
                   "peers":24,
                   "size":"2.07 GB",
                   "size_bytes":2222645576,
                   "date_uploaded":"2017-08-24 16:12:44",
                   "date_uploaded_unix":1503605564
                },
                {  
                   "url":"https://yts.ag/torrent/download/A2E7EA58534C1769D50EAD2DA2778836E407084C",
                   "hash":"A2E7EA58534C1769D50EAD2DA2778836E407084C",
                   "quality":"720p",
                   "seeds":2093,
                   "peers":264,
                   "size":"999.38 MB",
                   "size_bytes":1047925883,
                   "date_uploaded":"2017-08-08 16:17:05",
                   "date_uploaded_unix":1502223425
                },
                {  
                   "url":"https://yts.ag/torrent/download/4F3E2C6A942C2C270CB7E9D5498AC9AE96F3E31E",
                   "hash":"4F3E2C6A942C2C270CB7E9D5498AC9AE96F3E31E",
                   "quality":"1080p",
                   "seeds":3762,
                   "peers":383,
                   "size":"2.07 GB",
                   "size_bytes":2222645576,
                   "date_uploaded":"2017-08-08 18:54:21",
                   "date_uploaded_unix":1502232861
                }
             ],
             "date_uploaded":"2017-08-08 16:17:05",
             "date_uploaded_unix":1502223425
          },
          {  
             "id":6507,
             "url":"https://yts.ag/movie/logan-2017",
             "imdb_code":"tt3315342",
             "title":"Logan",
             "title_english":"Logan",
             "title_long":"Logan (2017)",
             "slug":"logan-2017",
             "year":2017,
             "rating":8.2,
             "runtime":137,
             "genres":[  
                "Action",
                "Drama",
                "Sci-Fi",
                "Thriller"
             ],
             "summary":"In 2029 the mutant population has shrunken significantly and the X-Men have disbanded. Logan, whose power to self-heal is dwindling, has surrendered himself to alcohol and now earns a living as a chauffeur. He takes care of the ailing old Professor X whom he keeps hidden away. One day, a female stranger asks Logan to drive a girl named Laura to the Canadian border. At first he refuses, but the Professor has been waiting for a long time for her to appear. Laura possesses an extraordinary fighting prowess and is in many ways like Wolverine. She is pursued by sinister figures working for a powerful corporation; this is because her DNA contains the secret that connects her to Logan. A relentless pursuit begins - In this third cinematic outing featuring the Marvel comic book character Wolverine we see the superheroes beset by everyday problems. They are aging, ailing and struggling to survive financially. A decrepit Logan is forced to ask himself if he can or even wants to put his ...",
             "description_full":"In 2029 the mutant population has shrunken significantly and the X-Men have disbanded. Logan, whose power to self-heal is dwindling, has surrendered himself to alcohol and now earns a living as a chauffeur. He takes care of the ailing old Professor X whom he keeps hidden away. One day, a female stranger asks Logan to drive a girl named Laura to the Canadian border. At first he refuses, but the Professor has been waiting for a long time for her to appear. Laura possesses an extraordinary fighting prowess and is in many ways like Wolverine. She is pursued by sinister figures working for a powerful corporation; this is because her DNA contains the secret that connects her to Logan. A relentless pursuit begins - In this third cinematic outing featuring the Marvel comic book character Wolverine we see the superheroes beset by everyday problems. They are aging, ailing and struggling to survive financially. A decrepit Logan is forced to ask himself if he can or even wants to put his ...",
             "synopsis":"In 2029 the mutant population has shrunken significantly and the X-Men have disbanded. Logan, whose power to self-heal is dwindling, has surrendered himself to alcohol and now earns a living as a chauffeur. He takes care of the ailing old Professor X whom he keeps hidden away. One day, a female stranger asks Logan to drive a girl named Laura to the Canadian border. At first he refuses, but the Professor has been waiting for a long time for her to appear. Laura possesses an extraordinary fighting prowess and is in many ways like Wolverine. She is pursued by sinister figures working for a powerful corporation; this is because her DNA contains the secret that connects her to Logan. A relentless pursuit begins - In this third cinematic outing featuring the Marvel comic book character Wolverine we see the superheroes beset by everyday problems. They are aging, ailing and struggling to survive financially. A decrepit Logan is forced to ask himself if he can or even wants to put his ...",
             "yt_trailer_code":"DekuSxJgpbY",
             "language":"English",
             "mpa_rating":"R",
             "background_image":"https://yts.ag/assets/images/movies/logan_2017/background.jpg",
             "background_image_original":"https://yts.ag/assets/images/movies/logan_2017/background.jpg",
             "small_cover_image":"https://yts.ag/assets/images/movies/logan_2017/small-cover.jpg",
             "medium_cover_image":"https://yts.ag/assets/images/movies/logan_2017/medium-cover.jpg",
             "large_cover_image":"https://yts.ag/assets/images/movies/logan_2017/large-cover.jpg",
             "state":"ok",
             "torrents":[  
                {  
                   "url":"https://yts.ag/torrent/download/A52324E4506C66CB30067BE13EE366C225BC4D70",
                   "hash":"A52324E4506C66CB30067BE13EE366C225BC4D70",
                   "quality":"720p",
                   "seeds":1281,
                   "peers":170,
                   "size":"1014.33 MB",
                   "size_bytes":1063602094,
                   "date_uploaded":"2017-05-22 04:27:42",
                   "date_uploaded_unix":1495441662
                },
                {  
                   "url":"https://yts.ag/torrent/download/1AB2CE4D62A9A46E91A3A3097BCEBD6248978D40",
                   "hash":"1AB2CE4D62A9A46E91A3A3097BCEBD6248978D40",
                   "quality":"1080p",
                   "seeds":1672,
                   "peers":193,
                   "size":"2.09 GB",
                   "size_bytes":2244120412,
                   "date_uploaded":"2017-05-22 06:55:05",
                   "date_uploaded_unix":1495450505
                }
             ],
             "date_uploaded":"2017-05-22 04:27:42",
             "date_uploaded_unix":1495441662
          },
          {  
             "id":6310,
             "url":"https://yts.ag/movie/arrival-2016",
             "imdb_code":"tt2543164",
             "title":"Arrival",
             "title_english":"Arrival",
             "title_long":"Arrival (2016)",
             "slug":"arrival-2016",
             "year":2016,
             "rating":8,
             "runtime":116,
             "genres":[  
                "Drama",
                "Mystery",
                "Sci-Fi",
                "Thriller"
             ],
             "summary":"Linguistics professor Louise Banks leads an elite team of investigators when gigantic spaceships touchdown in 12 locations around the world. As nations teeter on the verge of global war, Banks and her crew must race against time to find a way to communicate with the extraterrestrial visitors. Hoping to unravel the mystery, she takes a chance that could threaten her life and quite possibly all of mankind.",
             "description_full":"Linguistics professor Louise Banks leads an elite team of investigators when gigantic spaceships touchdown in 12 locations around the world. As nations teeter on the verge of global war, Banks and her crew must race against time to find a way to communicate with the extraterrestrial visitors. Hoping to unravel the mystery, she takes a chance that could threaten her life and quite possibly all of mankind.",
             "synopsis":"Linguistics professor Louise Banks leads an elite team of investigators when gigantic spaceships touchdown in 12 locations around the world. As nations teeter on the verge of global war, Banks and her crew must race against time to find a way to communicate with the extraterrestrial visitors. Hoping to unravel the mystery, she takes a chance that could threaten her life and quite possibly all of mankind.",
             "yt_trailer_code":"AMgyWT075KY",
             "language":"English",
             "mpa_rating":"PG-13",
             "background_image":"https://yts.ag/assets/images/movies/arrival_2016/background.jpg",
             "background_image_original":"https://yts.ag/assets/images/movies/arrival_2016/background.jpg",
             "small_cover_image":"https://yts.ag/assets/images/movies/arrival_2016/small-cover.jpg",
             "medium_cover_image":"https://yts.ag/assets/images/movies/arrival_2016/medium-cover.jpg",
             "large_cover_image":"https://yts.ag/assets/images/movies/arrival_2016/large-cover.jpg",
             "state":"ok",
             "torrents":[  
                {  
                   "url":"https://yts.ag/torrent/download/4F749B4CFA82BAA3363B4431B86BF808B581B1A2",
                   "hash":"4F749B4CFA82BAA3363B4431B86BF808B581B1A2",
                   "quality":"720p",
                   "seeds":555,
                   "peers":54,
                   "size":"852.73 MB",
                   "size_bytes":894152212,
                   "date_uploaded":"2017-02-01 18:22:12",
                   "date_uploaded_unix":1485991332
                },
                {  
                   "url":"https://yts.ag/torrent/download/AB41076CAABD1A9EBEF25795F1CFCC6491553881",
                   "hash":"AB41076CAABD1A9EBEF25795F1CFCC6491553881",
                   "quality":"1080p",
                   "seeds":657,
                   "peers":54,
                   "size":"1.77 GB",
                   "size_bytes":1900523028,
                   "date_uploaded":"2017-02-01 20:38:15",
                   "date_uploaded_unix":1485999495
                }
             ],
             "date_uploaded":"2017-02-01 18:22:12",
             "date_uploaded_unix":1485991332
          },
          {  
             "id":6217,
             "url":"https://yts.ag/movie/the-magnificent-seven-2016",
             "imdb_code":"tt2404435",
             "title":"The Magnificent Seven",
             "title_english":"The Magnificent Seven",
             "title_long":"The Magnificent Seven (2016)",
             "slug":"the-magnificent-seven-2016",
             "year":2016,
             "rating":6.9,
             "runtime":132,
             "genres":[  
                "Action",
                "Adventure",
                "Western"
             ],
             "summary":"Director Antoine Fuqua brings his modern vision to a classic story in The Magnificent Seven. With the town of Rose Creek under the deadly control of industrialist Bartholomew Bogue, the desperate townspeople employ protection from seven outlaws, bounty hunters, gamblers and hired guns. As they prepare the town for the violent showdown that they know is coming, these seven mercenaries find themselves fighting for more than money.",
             "description_full":"Director Antoine Fuqua brings his modern vision to a classic story in The Magnificent Seven. With the town of Rose Creek under the deadly control of industrialist Bartholomew Bogue, the desperate townspeople employ protection from seven outlaws, bounty hunters, gamblers and hired guns. As they prepare the town for the violent showdown that they know is coming, these seven mercenaries find themselves fighting for more than money.",
             "synopsis":"Director Antoine Fuqua brings his modern vision to a classic story in The Magnificent Seven. With the town of Rose Creek under the deadly control of industrialist Bartholomew Bogue, the desperate townspeople employ protection from seven outlaws, bounty hunters, gamblers and hired guns. As they prepare the town for the violent showdown that they know is coming, these seven mercenaries find themselves fighting for more than money.",
             "yt_trailer_code":"q-RBA0xoaWU",
             "language":"English",
             "mpa_rating":"PG-13",
             "background_image":"https://yts.ag/assets/images/movies/the_magnificent_seven_2016/background.jpg",
             "background_image_original":"https://yts.ag/assets/images/movies/the_magnificent_seven_2016/background.jpg",
             "small_cover_image":"https://yts.ag/assets/images/movies/the_magnificent_seven_2016/small-cover.jpg",
             "medium_cover_image":"https://yts.ag/assets/images/movies/the_magnificent_seven_2016/medium-cover.jpg",
             "large_cover_image":"https://yts.ag/assets/images/movies/the_magnificent_seven_2016/large-cover.jpg",
             "state":"ok",
             "torrents":[  
                {  
                   "url":"https://yts.ag/torrent/download/2654480F01BD187024016281A344E5AB1D5548CF",
                   "hash":"2654480F01BD187024016281A344E5AB1D5548CF",
                   "quality":"720p",
                   "seeds":349,
                   "peers":29,
                   "size":"985.99 MB",
                   "size_bytes":1033885450,
                   "date_uploaded":"2016-12-06 15:52:38",
                   "date_uploaded_unix":1481057558
                },
                {  
                   "url":"https://yts.ag/torrent/download/9B4C9DB1F1ECC3AB3F4E4EF9A7D5D38D791B7F7A",
                   "hash":"9B4C9DB1F1ECC3AB3F4E4EF9A7D5D38D791B7F7A",
                   "quality":"1080p",
                   "seeds":405,
                   "peers":35,
                   "size":"2.03 GB",
                   "size_bytes":2179695903,
                   "date_uploaded":"2016-12-06 18:22:11",
                   "date_uploaded_unix":1481066531
                }
             ],
             "date_uploaded":"2016-12-06 15:52:38",
             "date_uploaded_unix":1481057558
          },
          {  
             "id":6212,
             "url":"https://yts.ag/movie/sully-2016",
             "imdb_code":"tt3263904",
             "title":"Sully",
             "title_english":"Sully",
             "title_long":"Sully (2016)",
             "slug":"sully-2016",
             "year":2016,
             "rating":7.5,
             "runtime":96,
             "genres":[  
                "Action",
                "Biography",
                "Drama"
             ],
             "summary":"On Thursday, January 15th, 2009, the world witnessed the \"Miracle on the Hudson\" when Captain Chesley Sullenberger, nicknamed \"Sully\", glided his disabled plane onto the frigid waters of the Hudson River, saving the lives of all 155 aboard. However, even as Sully was being heralded by the public and the media for his unprecedented feat of aviation skill, an investigation was unfolding that threatened to destroy his reputation and his career.",
             "description_full":"On Thursday, January 15th, 2009, the world witnessed the \"Miracle on the Hudson\" when Captain Chesley Sullenberger, nicknamed \"Sully\", glided his disabled plane onto the frigid waters of the Hudson River, saving the lives of all 155 aboard. However, even as Sully was being heralded by the public and the media for his unprecedented feat of aviation skill, an investigation was unfolding that threatened to destroy his reputation and his career.",
             "synopsis":"On Thursday, January 15th, 2009, the world witnessed the \"Miracle on the Hudson\" when Captain Chesley Sullenberger, nicknamed \"Sully\", glided his disabled plane onto the frigid waters of the Hudson River, saving the lives of all 155 aboard. However, even as Sully was being heralded by the public and the media for his unprecedented feat of aviation skill, an investigation was unfolding that threatened to destroy his reputation and his career.",
             "yt_trailer_code":"3kDjUSnYDsw",
             "language":"English",
             "mpa_rating":"PG-13",
             "background_image":"https://yts.ag/assets/images/movies/sully_2016/background.jpg",
             "background_image_original":"https://yts.ag/assets/images/movies/sully_2016/background.jpg",
             "small_cover_image":"https://yts.ag/assets/images/movies/sully_2016/small-cover.jpg",
             "medium_cover_image":"https://yts.ag/assets/images/movies/sully_2016/medium-cover.jpg",
             "large_cover_image":"https://yts.ag/assets/images/movies/sully_2016/large-cover.jpg",
             "state":"ok",
             "torrents":[  
                {  
                   "url":"https://yts.ag/torrent/download/23B285BB637497E673A6013B19119E77BD713AAD",
                   "hash":"23B285BB637497E673A6013B19119E77BD713AAD",
                   "quality":"720p",
                   "seeds":403,
                   "peers":37,
                   "size":"713.65 MB",
                   "size_bytes":748316262,
                   "date_uploaded":"2016-12-03 21:51:18",
                   "date_uploaded_unix":1480819878
                },
                {  
                   "url":"https://yts.ag/torrent/download/1581F09B4A26C3615F72B3B932627F5B8D6DD9F0",
                   "hash":"1581F09B4A26C3615F72B3B932627F5B8D6DD9F0",
                   "quality":"1080p",
                   "seeds":425,
                   "peers":29,
                   "size":"1.47 GB",
                   "size_bytes":1578400481,
                   "date_uploaded":"2016-12-04 00:42:48",
                   "date_uploaded_unix":1480830168
                }
             ],
             "date_uploaded":"2016-12-03 21:51:18",
             "date_uploaded_unix":1480819878
          },
          {  
             "id":6598,
             "url":"https://yts.ag/movie/the-fate-of-the-furious-2017",
             "imdb_code":"tt4630562",
             "title":"The Fate of the Furious",
             "title_english":"The Fate of the Furious",
             "title_long":"The Fate of the Furious (2017)",
             "slug":"the-fate-of-the-furious-2017",
             "year":2017,
             "rating":6.8,
             "runtime":136,
             "genres":[  
                "Action",
                "Adventure",
                "Crime",
                "Thriller"
             ],
             "summary":"Now that Dom and Letty are on their honeymoon and Brian and Mia have retired from the game-and the rest of the crew has been exonerated-the globetrotting team has found a semblance of a normal life. But when a mysterious woman seduces Dom into the world of crime he can't seem to escape and a betrayal of those closest to him, they will face trials that will test them as never before. From the shores of Cuba and the streets of New York City to the icy plains off the arctic Barents Sea, the elite force will crisscross the globe to stop an anarchist from unleashing chaos on the world's stage... and to bring home the man who made them a family.",
             "description_full":"Now that Dom and Letty are on their honeymoon and Brian and Mia have retired from the game-and the rest of the crew has been exonerated-the globetrotting team has found a semblance of a normal life. But when a mysterious woman seduces Dom into the world of crime he can't seem to escape and a betrayal of those closest to him, they will face trials that will test them as never before. From the shores of Cuba and the streets of New York City to the icy plains off the arctic Barents Sea, the elite force will crisscross the globe to stop an anarchist from unleashing chaos on the world's stage... and to bring home the man who made them a family.",
             "synopsis":"Now that Dom and Letty are on their honeymoon and Brian and Mia have retired from the game-and the rest of the crew has been exonerated-the globetrotting team has found a semblance of a normal life. But when a mysterious woman seduces Dom into the world of crime he can't seem to escape and a betrayal of those closest to him, they will face trials that will test them as never before. From the shores of Cuba and the streets of New York City to the icy plains off the arctic Barents Sea, the elite force will crisscross the globe to stop an anarchist from unleashing chaos on the world's stage... and to bring home the man who made them a family.",
             "yt_trailer_code":"JwMKRevYa_M",
             "language":"English",
             "mpa_rating":"PG-13",
             "background_image":"https://yts.ag/assets/images/movies/the_fate_of_the_furious_2017/background.jpg",
             "background_image_original":"https://yts.ag/assets/images/movies/the_fate_of_the_furious_2017/background.jpg",
             "small_cover_image":"https://yts.ag/assets/images/movies/the_fate_of_the_furious_2017/small-cover.jpg",
             "medium_cover_image":"https://yts.ag/assets/images/movies/the_fate_of_the_furious_2017/medium-cover.jpg",
             "large_cover_image":"https://yts.ag/assets/images/movies/the_fate_of_the_furious_2017/large-cover.jpg",
             "state":"ok",
             "torrents":[  
                {  
                   "url":"https://yts.ag/torrent/download/BBE2CCBB81E647039787D75BAA7A42B50F25035E",
                   "hash":"BBE2CCBB81E647039787D75BAA7A42B50F25035E",
                   "quality":"720p",
                   "seeds":1223,
                   "peers":219,
                   "size":"1007.38 MB",
                   "size_bytes":1056314491,
                   "date_uploaded":"2017-06-29 12:10:18",
                   "date_uploaded_unix":1498752618
                },
                {  
                   "url":"https://yts.ag/torrent/download/11334535AFDBF65619FB1A31E79EED2B9EAAE287",
                   "hash":"11334535AFDBF65619FB1A31E79EED2B9EAAE287",
                   "quality":"1080p",
                   "seeds":1483,
                   "peers":136,
                   "size":"2.08 GB",
                   "size_bytes":2233382994,
                   "date_uploaded":"2017-06-29 14:45:05",
                   "date_uploaded_unix":1498761905
                }
             ],
             "date_uploaded":"2017-06-29 12:10:18",
             "date_uploaded_unix":1498752618
          },
          {  
             "id":6213,
             "url":"https://yts.ag/movie/miss-peregrines-home-for-peculiar-children-2016",
             "imdb_code":"tt1935859",
             "title":"Miss Peregrine's Home for Peculiar Children",
             "title_english":"Miss Peregrine's Home for Peculiar Children",
             "title_long":"Miss Peregrine's Home for Peculiar Children (2016)",
             "slug":"miss-peregrines-home-for-peculiar-children-2016",
             "year":2016,
             "rating":6.7,
             "runtime":127,
             "genres":[  
                "Action",
                "Adventure",
                "Drama",
                "Family",
                "Fantasy"
             ],
             "summary":"When Jacob discovers clues to a mystery that spans different worlds and times, he finds a magical place known as Miss Peregrine's Home for Peculiar Children. But the mystery and danger deepen as he gets to know the residents and learns about their special powers... and their powerful enemies. Ultimately, Jacob discovers that only his own special \"peculiarity\" can save his new friends.",
             "description_full":"When Jacob discovers clues to a mystery that spans different worlds and times, he finds a magical place known as Miss Peregrine's Home for Peculiar Children. But the mystery and danger deepen as he gets to know the residents and learns about their special powers... and their powerful enemies. Ultimately, Jacob discovers that only his own special \"peculiarity\" can save his new friends.",
             "synopsis":"When Jacob discovers clues to a mystery that spans different worlds and times, he finds a magical place known as Miss Peregrine's Home for Peculiar Children. But the mystery and danger deepen as he gets to know the residents and learns about their special powers... and their powerful enemies. Ultimately, Jacob discovers that only his own special \"peculiarity\" can save his new friends.",
             "yt_trailer_code":"mAdpJw-MM-M",
             "language":"English",
             "mpa_rating":"PG-13",
             "background_image":"https://yts.ag/assets/images/movies/miss_peregrines_home_for_peculiar_children_2016/background.jpg",
             "background_image_original":"https://yts.ag/assets/images/movies/miss_peregrines_home_for_peculiar_children_2016/background.jpg",
             "small_cover_image":"https://yts.ag/assets/images/movies/miss_peregrines_home_for_peculiar_children_2016/small-cover.jpg",
             "medium_cover_image":"https://yts.ag/assets/images/movies/miss_peregrines_home_for_peculiar_children_2016/medium-cover.jpg",
             "large_cover_image":"https://yts.ag/assets/images/movies/miss_peregrines_home_for_peculiar_children_2016/large-cover.jpg",
             "state":"ok",
             "torrents":[  
                {  
                   "url":"https://yts.ag/torrent/download/09A2CDD7C3EEB945CC65FC5407C85ACCDAC95EF9",
                   "hash":"09A2CDD7C3EEB945CC65FC5407C85ACCDAC95EF9",
                   "quality":"3D",
                   "seeds":27,
                   "peers":8,
                   "size":"1.94 GB",
                   "size_bytes":2083059139,
                   "date_uploaded":"2017-03-02 19:21:14",
                   "date_uploaded_unix":1488500474
                },
                {  
                   "url":"https://yts.ag/torrent/download/AC1D164A300291B6A5F89902089ED400336ABC45",
                   "hash":"AC1D164A300291B6A5F89902089ED400336ABC45",
                   "quality":"720p",
                   "seeds":353,
                   "peers":29,
                   "size":"930.25 MB",
                   "size_bytes":975437824,
                   "date_uploaded":"2016-12-04 02:28:27",
                   "date_uploaded_unix":1480836507
                },
                {  
                   "url":"https://yts.ag/torrent/download/64BC21FE3AA40A29C3875577ACBFEF2E1908910C",
                   "hash":"64BC21FE3AA40A29C3875577ACBFEF2E1908910C",
                   "quality":"1080p",
                   "seeds":619,
                   "peers":76,
                   "size":"1.93 GB",
                   "size_bytes":2072321720,
                   "date_uploaded":"2016-12-04 05:05:54",
                   "date_uploaded_unix":1480845954
                }
             ],
             "date_uploaded":"2016-12-04 02:28:27",
             "date_uploaded_unix":1480836507
          },
          {  
             "id":1631,
             "url":"https://yts.ag/movie/insurgent-2015",
             "imdb_code":"tt2908446",
             "title":"Insurgent",
             "title_english":"Insurgent",
             "title_long":"Insurgent (2015)",
             "slug":"insurgent-2015",
             "year":2015,
             "rating":6.3,
             "runtime":119,
             "genres":[  
                "Action",
                "Adventure",
                "Sci-Fi",
                "Thriller"
             ],
             "summary":"One choice can transform you-or it can destroy you. But every choice has consequences, and as unrest surges in the factions all around her, Tris Prior must continue trying to save those she loves--and herself--while grappling with haunting questions of grief and forgiveness, identity and loyalty, politics and love. Tris's initiation day should have been marked by celebration and victory with her chosen faction; instead, the day ended with unspeakable horrors. War now looms as conflict between the factions and their ideologies grows. And in times of war, sides must be chosen, secrets will emerge, and choices will become even more irrevocable--and even more powerful. Transformed by her own decisions but also by haunting grief and guilt, radical new discoveries, and shifting relationships. Tris must fully embrace her Divergence, even if she does not know what she may lose by doing so.",
             "description_full":"One choice can transform you-or it can destroy you. But every choice has consequences, and as unrest surges in the factions all around her, Tris Prior must continue trying to save those she loves--and herself--while grappling with haunting questions of grief and forgiveness, identity and loyalty, politics and love. Tris's initiation day should have been marked by celebration and victory with her chosen faction; instead, the day ended with unspeakable horrors. War now looms as conflict between the factions and their ideologies grows. And in times of war, sides must be chosen, secrets will emerge, and choices will become even more irrevocable--and even more powerful. Transformed by her own decisions but also by haunting grief and guilt, radical new discoveries, and shifting relationships. Tris must fully embrace her Divergence, even if she does not know what she may lose by doing so.",
             "synopsis":"One choice can transform you-or it can destroy you. But every choice has consequences, and as unrest surges in the factions all around her, Tris Prior must continue trying to save those she loves--and herself--while grappling with haunting questions of grief and forgiveness, identity and loyalty, politics and love. Tris's initiation day should have been marked by celebration and victory with her chosen faction; instead, the day ended with unspeakable horrors. War now looms as conflict between the factions and their ideologies grows. And in times of war, sides must be chosen, secrets will emerge, and choices will become even more irrevocable--and even more powerful. Transformed by her own decisions but also by haunting grief and guilt, radical new discoveries, and shifting relationships. Tris must fully embrace her Divergence, even if she does not know what she may lose by doing so.",
             "yt_trailer_code":"IR-l_TSjlEo",
             "language":"English",
             "mpa_rating":"PG-13",
             "background_image":"https://yts.ag/assets/images/movies/insurgent_2015/background.jpg",
             "background_image_original":"https://yts.ag/assets/images/movies/insurgent_2015/background.jpg",
             "small_cover_image":"https://yts.ag/assets/images/movies/insurgent_2015/small-cover.jpg",
             "medium_cover_image":"https://yts.ag/assets/images/movies/insurgent_2015/medium-cover.jpg",
             "large_cover_image":"https://yts.ag/assets/images/movies/insurgent_2015/large-cover.jpg",
             "state":"ok",
             "torrents":[  
                {  
                   "url":"https://yts.ag/torrent/download/4B9F417AD8F79E60B76E2FD1616546BEC673D31B",
                   "hash":"4B9F417AD8F79E60B76E2FD1616546BEC673D31B",
                   "quality":"3D",
                   "seeds":23,
                   "peers":4,
                   "size":"1.85 GB",
                   "size_bytes":1986422374,
                   "date_uploaded":"2015-11-01 22:45:50",
                   "date_uploaded_unix":1446435950
                },
                {  
                   "url":"https://yts.ag/torrent/download/12833D8E2B2007B7E2C30490FC8892912FE8423F",
                   "hash":"12833D8E2B2007B7E2C30490FC8892912FE8423F",
                   "quality":"720p",
                   "seeds":432,
                   "peers":28,
                   "size":"864.78 MB",
                   "size_bytes":906787553,
                   "date_uploaded":"2015-11-01 00:17:47",
                   "date_uploaded_unix":1446351467
                },
                {  
                   "url":"https://yts.ag/torrent/download/6AB9E319C6414F4800FEB05AFBB84111A671C8E1",
                   "hash":"6AB9E319C6414F4800FEB05AFBB84111A671C8E1",
                   "quality":"1080p",
                   "seeds":249,
                   "peers":34,
                   "size":"1.84 GB",
                   "size_bytes":1975684956,
                   "date_uploaded":"2015-11-01 00:17:50",
                   "date_uploaded_unix":1446351470
                }
             ],
             "date_uploaded":"2015-11-01 00:17:47",
             "date_uploaded_unix":1446351467
          }
       ]
    },
    "@meta":{  
       "server_time":1509418698,
       "server_timezone":"EST5EDT",
       "api_version":2,
       "execution_time":"0 ms"
    }
 }];
};
export default App;

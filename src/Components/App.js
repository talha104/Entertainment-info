import React from 'react';
import '../App.css';
import axios from 'axios';
import {BrowserRouter, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';

import LandingList from "./LandingList";
import MoviesList from "./MoviesList";
import Pagination from "./Pagination";
import MainTv from "./MainTv";
import MovieDesc from "./MovieDesc";
import TvDesc from "./TvDesc";

class App extends React.Component {

  state = {
    movies: [],
    pages: 1,
    trending: [],
    toprated: [],
    originals: [],
    popular: [],
    selected: [],
    openMovie: false,
    openTv: false,
    cast: [],
    similar: [],
    clicked: false,
    search : [],
    tap: false,
    genres: [],
    gcode : ''
  }

  componentDidMount() {
    this.getmovies()
    this.getcast()
    this.getSearch()
    this.paginateMain()
    this.getTrending()
    this.getPopular()
    this.getTop()
    this.getOriginals()
  }

  getmovies = () => {
    axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=92036cd40c0e1112f1d9e6dab2c4a657&language=en-US&page=1")
    .then( response => {
      this.setState({
        movies: response.data.results,
        pages: response.data.total_pages
      })
    })
    .catch( err => {
        console.log("Error parsing and getting data", err)
      })
  }

  paginateMain = pageNumber => {
    axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=92036cd40c0e1112f1d9e6dab2c4a657&language=en-US&page=" + pageNumber)
    .then( response => {
      this.setState({
        movies: response.data.results
      })
    })
    .catch( err => {
        console.log("Error parsing and getting data", err)
      })
  }

  getTrending = () => {
    axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=92036cd40c0e1112f1d9e6dab2c4a657&language=en-US")
    .then( response => {
      this.setState({
        trending: response.data.results
      })
    })
    .catch( err => {
        console.log("Error parsing and getting data", err)
      })
  }

  getTop = () => {
    axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key=92036cd40c0e1112f1d9e6dab2c4a657&language=en-US")
    .then( response => {
      this.setState({
        toprated: response.data.results
      })
    })
    .catch( err => {
        console.log("Error parsing and getting data", err)
      })
  }

  getOriginals = () => {
    axios.get("https://api.themoviedb.org/3/discover/tv?api_key=92036cd40c0e1112f1d9e6dab2c4a657&language=en-US&sort_by=popularity.desc&with_networks=213")
    .then( response => {
      this.setState({
        originals: response.data.results
      })
    })
    .catch( err => {
        console.log("Error parsing and getting data", err)
      })
  }

  getPopular = () => {
    axios.get("https://api.themoviedb.org/3/movie/popular?api_key=92036cd40c0e1112f1d9e6dab2c4a657&language=en-US&page=1")
    .then( response => {
      this.setState({
        popular: response.data.results
      })
    })
    .catch( err => {
        console.log("Error parsing and getting data", err)
      })
  }

  getcast = id => {
    axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=92036cd40c0e1112f1d9e6dab2c4a657&language=en-US`)
    .then( response => {
      this.setState({
        cast: response.data.cast
      })
      console.log(this.state.cast)
    })
    .catch( err => {
      console.log("Error parsing and getting data", err)
    })
  }

  popup = id => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=92036cd40c0e1112f1d9e6dab2c4a657&language=en-US`)
    .then( response => {
      this.setState({
        selected: response.data,
        openMovie: true
      })
    })
    .catch( err => {
      console.log("Error parsing and getting data", err)
    })
  }

  popupTv = id => {
    axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=92036cd40c0e1112f1d9e6dab2c4a657&language=en-US`)
    .then( response => {
      this.setState({
        selected: response.data,
        openTv: true
      })
    })
    .catch( err => {
      console.log("Error parsing and getting data", err)
    })
  }

  toggle = () => {
    this.setState({
      openMovie: false,
      openTv: false,
      similar: [],
      cast: []
    })
  }

  similar = id => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=92036cd40c0e1112f1d9e6dab2c4a657&language=en-US&page=1`)
    .then( response => {
      this.setState({
        similar: response.data.results
      })
    })
    .catch( err => {
      console.log("Error parsing and getting data", err)
    })
  }

  getClicked = () => {
    this.setState({
      clicked: !this.state.clicked,
      openMovie: false,
      openTv: false
    })
  }

  getSearch = query => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=92036cd40c0e1112f1d9e6dab2c4a657&language=en-US&query=${query}`)
    .then( response => {
      this.setState({
        search: response.data.results
      })
    })
    .catch( err => {
      console.log("Error parsing and getting data", err)
    })
  }

  getTap = () => {
    this.setState({
      tap: !this.state.tap
    })
  }

  getGenres = genres => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=92036cd40c0e1112f1d9e6dab2c4a657&language=en-US&sort_by=popularity.desc&with_genres=${genres}`)
    .then( response => {
      this.setState({
        genres: response.data.results,
        pages: response.data.total_pages,
        gcode: genres
      })
      console.log(response.data)
    })
    .catch( err => {
      console.log("Error parsing and getting data", err)
    })
  }

  paginateGenres = pageNumber => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=92036cd40c0e1112f1d9e6dab2c4a657&language=en-US&sort_by=popularity.desc&with_genres=${this.state.gcode}&page=` + pageNumber)
    .then( response => {
      this.setState({
        genres: response.data.results
      })
    })
    .catch( err => {
        console.log("Error parsing and getting data", err)
      })
  }

  action = () => {
    this.getGenres(28)
    return (
      <div className="main">
        <input type="text" placeholder="Search Movies" className={this.state.clicked ? "bar down" : "bar up"} onChange={(e) => this.getSearch(e.target.value)}/>
        <div id="top">
          <h1 className={this.state.clicked ? "up" : "down"} >Action Movies</h1>
          <h1 className={this.state.clicked ? "down sb" : "up sb"}>Search Result</h1>
        </div>
        <h1 id="top" className={this.state.clicked ? "down" : "up"}>Search Result</h1>
        <MoviesList main={true} data={this.state.clicked ? this.state.search : this.state.genres} popup={this.popup} similar={this.similar}/>
        <MovieDesc open={this.state.openMovie} popup={this.popup} similar={this.similar} data={this.state.similar} selected={this.state.selected} toggle={this.toggle}/>
        <Pagination clicked={this.state.clicked} pages={this.state.pages} paginate={this.paginateGenres}/>
      </div>
      );
  }

  adventure = () => {
    this.getGenres(12)
    return (
      <div className="main">
        <input type="text" placeholder="Search Movies" className={this.state.clicked ? "bar down" : "bar up"} onChange={(e) => this.getSearch(e.target.value)}/>
        <div id="top">
          <h1 className={this.state.clicked ? "up" : "down"} >Adventure Movies</h1>
          <h1 className={this.state.clicked ? "down sb" : "up sb"}>Search Result</h1>
        </div>
        <MoviesList main={true} data={this.state.clicked ? this.state.search : this.state.genres} popup={this.popup} similar={this.similar}/>
        <MovieDesc open={this.state.openMovie} popup={this.popup} similar={this.similar} data={this.state.similar} selected={this.state.selected} toggle={this.toggle}/>
        <Pagination clicked={this.state.clicked} pages={this.state.pages} paginate={this.paginateGenres}/>
      </div>
      );
  }

  comedy = () => {
    this.getGenres(35)
    return (
      <div className="main">
        <input type="text" placeholder="Search Movies" className={this.state.clicked ? "bar down" : "bar up"} onChange={(e) => this.getSearch(e.target.value)}/>
        <div id="top">
          <h1 className={this.state.clicked ? "up" : "down"} >Comedy Movies</h1>
          <h1 className={this.state.clicked ? "down sb" : "up sb"}>Search Result</h1>
        </div>
        <MoviesList main={true} data={this.state.clicked ? this.state.search : this.state.genres} popup={this.popup} similar={this.similar}/>
        <MovieDesc open={this.state.openMovie} popup={this.popup} similar={this.similar} data={this.state.similar} selected={this.state.selected} toggle={this.toggle}/>
        <Pagination clicked={this.state.clicked} pages={this.state.pages} paginate={this.paginateGenres}/>
      </div>
      );
  }

  drama = () => {
    this.getGenres(18)
    return (
      <div className="main">
        <input type="text" placeholder="Search Movies" className={this.state.clicked ? "bar down" : "bar up"} onChange={(e) => this.getSearch(e.target.value)}/>
        <div id="top">
          <h1 className={this.state.clicked ? "up" : "down"} >Drama Movies</h1>
          <h1 className={this.state.clicked ? "down sb" : "up sb"}>Search Result</h1>
        </div>
        <MoviesList main={true} data={this.state.clicked ? this.state.search : this.state.genres} popup={this.popup} similar={this.similar}/>
        <MovieDesc open={this.state.openMovie} popup={this.popup} similar={this.similar} data={this.state.similar} selected={this.state.selected} toggle={this.toggle}/>
        <Pagination clicked={this.state.clicked} pages={this.state.pages} paginate={this.paginateGenres}/>
      </div>
      );
  }

  family = () => {
    this.getGenres(10751)
    return (
      <div className="main">
        <input type="text" placeholder="Search Movies" className={this.state.clicked ? "bar down" : "bar up"} onChange={(e) => this.getSearch(e.target.value)}/>
        <div id="top">
          <h1 className={this.state.clicked ? "up" : "down"} >Family Movies</h1>
          <h1 className={this.state.clicked ? "down sb" : "up sb"}>Search Result</h1>
        </div>
        <MoviesList main={true} data={this.state.clicked ? this.state.search : this.state.genres} popup={this.popup} similar={this.similar}/>
        <MovieDesc open={this.state.openMovie} popup={this.popup} similar={this.similar} data={this.state.similar} selected={this.state.selected} toggle={this.toggle}/>
        <Pagination clicked={this.state.clicked} pages={this.state.pages} paginate={this.paginateGenres}/>
      </div>
      );
  }

  romance = () => {
    this.getGenres(10749)
    return (
      <div className="main">
        <input type="text" placeholder="Search Movies" className={this.state.clicked ? "bar down" : "bar up"} onChange={(e) => this.getSearch(e.target.value)}/>
        <div id="top">
          <h1 className={this.state.clicked ? "up" : "down"} >Romantic Movies</h1>
          <h1 className={this.state.clicked ? "down sb" : "up sb"}>Search Result</h1>
        </div>
        <MoviesList main={true} data={this.state.clicked ? this.state.search : this.state.genres} popup={this.popup} similar={this.similar}/>
        <MovieDesc open={this.state.openMovie} popup={this.popup} similar={this.similar} data={this.state.similar} selected={this.state.selected} toggle={this.toggle}/>
        <Pagination clicked={this.state.clicked} pages={this.state.pages} paginate={this.paginateGenres}/>
      </div>
      );
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" render={props=>(
            <div>
              <header>
                <div className="above">
                  <Link to="/" className="header"><h1>ShowBiz</h1></Link>
                </div>
                <nav>
                  <Link to="/movies" className="nav" onClick={() => this.getmovies()} >Movies</Link> <Link to="/tv" className="nav">TV Shows</Link>
                  <img className="search" onClick={() => this.getClicked()} src="/images/search.jpg"/>
                </nav>
              </header>

              <div className="mainLite">
                <div className="lite">
                  <input type="text" placeholder="Search Movies" className={this.state.clicked ? "bar down" : "bar up"} onChange={(e) => this.getSearch(e.target.value)}/>
                  <div id="top">
                    <h2 className={this.state.clicked ? "up trend" : "down trend"} >Trending</h2>
                    <h1 className={this.state.clicked ? "down sb" : "up sb"}>Search Result</h1>
                  </div>
                  <LandingList show={false} main={true} data={this.state.clicked ? this.state.search : this.state.trending} popup={this.popup} similar={this.similar}/>
                  <MovieDesc open={this.state.openMovie} popup={this.popup} similar={this.similar} data={this.state.similar} selected={this.state.selected} toggle={this.toggle}/>
                </div>

                <div className="lite">
                  <h2 className={this.state.clicked ? "up" : "down"} >Award Winning Series</h2>
                  <LandingList show={true} main={true} getcast={this.getcast} data={this.state.clicked ? [] : this.state.toprated} popup={this.popupTv}/>
                  <TvDesc open={this.state.openTv} selected={this.state.selected} cast={this.state.cast} toggle={this.toggle}/>
                </div>

                <div className="lite">
                  <h2 className={this.state.clicked ? "up" : "down"} >Netflix Originals</h2>
                  <LandingList show={true} main={false} getcast={this.getcast} data={this.state.clicked ? [] : this.state.originals} popup={this.popupTv}/>
                  <TvDesc open={this.state.openTv} selected={this.state.selected} cast={this.state.cast} toggle={this.toggle}/>
                </div>

                <div className="lite last">
                  <h2 className={this.state.clicked ? "up" : "down"} >Popular Movies</h2>
                  <LandingList show={false} main={true} data={this.state.clicked ? [] : this.state.popular} popup={this.popup} similar={this.similar}/>
                  <MovieDesc open={this.state.openMovie} popup={this.popup} similar={this.similar} data={this.state.similar} selected={this.state.selected} toggle={this.toggle}/>
                </div>
              </div>
            </div>
            )} />

          <Route path="/movies" render={props=> (
            <div>
            <header>
              <div className="above">
                <Link to="/" className="header"><h1>ShowBiz</h1></Link>
              </div>
              <nav>
                <Link to="/movies" className="nav" onClick={() => this.getmovies()} >Movies</Link> <Link to="/tv" className="nav">TV Shows</Link>
                <img className="search" onClick={() => this.getClicked()} src="/images/search.jpg"/>
              </nav>
            </header>

            <div className="genres" onClick={() => this.getTap()}>
              <h3 >Genres ↓</h3>
              <Link to="/movies/action" onClick={() => this.action()} className={this.state.tap ? "show" : "hide"}>Action</Link>
              <Link to="/movies/adventure" onClick={() => this.adventure()} className={this.state.tap ? "show" : "hide"}>Adventure</Link>
              <Link to="/movies/comedy" onClick={() => this.comedy()} className={this.state.tap ? "show" : "hide"}>Comedy</Link>
              <Link to="/movies/drama" onClick={() => this.drama()} className={this.state.tap ? "show" : "hide"}>Drama</Link>
              <Link to="/movies/family" onClick={() => this.family()} className={this.state.tap ? "show" : "hide"}>Family</Link>
              <Link to="/movies/romance" onClick={() => this.romance()} className={this.state.tap ? "show" : "hide"}>Romance</Link>
            </div>
            </div>
            )} />

          <Route exact path="/movies" render={props=> (
            <div>
            <div className="main">
              <input type="text" placeholder="Search Movies" className={this.state.clicked ? "bar down" : "bar up"} onChange={(e) => this.getSearch(e.target.value)}/>
              <div id="top">
                <h1 className={this.state.clicked ? "up" : "down"} >Now Playing</h1>
                <h1 className={this.state.clicked ? "down sb" : "up sb"}>Search Result</h1>
              </div>
              <MoviesList main={true} data={this.state.clicked ? this.state.search : this.state.movies} popup={this.popup} similar={this.similar}/>
              <MovieDesc open={this.state.openMovie} popup={this.popup} similar={this.similar} data={this.state.similar} selected={this.state.selected} toggle={this.toggle}/>
              <Pagination clicked={this.state.clicked} pages={this.state.pages} paginate={this.paginateMain}/>
            </div>
            </div>
          )}/>

          <Route path="/movies/action" render={props=> (            
            this.action()
          )}/>

          <Route path="/movies/adventure" render={props=> (            
            this.adventure()
          )}/>

          <Route path="/movies/comedy" render={props=> (            
            this.comedy()
          )}/>

          <Route path="/movies/drama" render={props=> (            
            this.drama()
          )}/>

          <Route path="/movies/family" render={props=> (            
            this.family()
          )}/>

          <Route path="/movies/romance" render={props=> (            
            this.romance()
          )}/>

          <Route path="/tv" component={() => <MainTv getmovies={this.getmovies}/>} />

          <Route path ="/movies" render={props=> ( 
            <footer>
              <p className="footer">Copyrights</p>
            </footer>
          )} />

          <Route exact path ="/" render={props=> ( 
            <footer>
              <p className="footer">Copyrights</p>
            </footer>
          )} />
          

        </div>
      </BrowserRouter>
    );
  }
}

export default App;

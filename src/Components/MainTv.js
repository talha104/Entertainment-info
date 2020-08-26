import React from 'react';
import '../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {BrowserRouter, Route} from 'react-router-dom';

import App from "./App"
import Pagination from "./Pagination";
import TvDesc from "./TvDesc";
import TvList from "./TvList";

class Latest extends React.Component {

	state = {
    shows: [],
    pages: 1,
    selected: [],
    open: false,
    cast: [],
    clicked: false,
    search: [],
    tap: false,
    genres: [],
    gcode: ''
  }

  componentDidMount() {
    axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key=92036cd40c0e1112f1d9e6dab2c4a657&language=en-US")
    .then( response => {
      this.setState({
        shows: response.data.results,
        pages: response.data.total_pages
      })
    })
    .catch( err => {
        console.log("Error parsing and getting data", err)
      })

    this.popup()
    this.getcast()
    this.paginate()
  }

  paginate = pageNumber => {
    axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key=92036cd40c0e1112f1d9e6dab2c4a657&language=en-US&page=" + pageNumber)
    .then( response => {
      this.setState({
        shows: response.data.results,
        pages: response.data.total_pages
      })
    })
    .catch( err => {
        console.log("Error parsing and getting data", err)
      })
  }

  popup = id => {
    axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=92036cd40c0e1112f1d9e6dab2c4a657&language=en-US`)
    .then( response => {
      this.setState({
        selected: response.data,
        open: true
      })
    })
    .catch( err => {
      console.log("Error parsing and getting data", err)
    })
  }

  toggle = () => {
    this.setState({
      open: false,
      cast: []
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

  getClicked = () => {
    this.setState({
      clicked: !this.state.clicked,
      open: false
    })
  }

  getSearch = query => {
    axios.get(`https://api.themoviedb.org/3/search/tv?api_key=92036cd40c0e1112f1d9e6dab2c4a657&language=en-US&query=${query}`)
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
    axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=92036cd40c0e1112f1d9e6dab2c4a657&language=en-US&sort_by=popularity.desc&with_genres=${this.state.gcode}`)
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
    axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=92036cd40c0e1112f1d9e6dab2c4a657&language=en-US&sort_by=popularity.desc&with_genres=${this.state.gcode}&page=` + pageNumber)
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
    this.getGenres(10759)
    return (
      <div className="main">
        <input type="text" placeholder="Search TV Shows" className={this.state.clicked ? "bar down" : "bar up"} onChange={(e) => this.getSearch(e.target.value)}/>
        <div id="top">
          <h1 className={this.state.clicked ? "up" : "down"} >Action TV Shows</h1>
          <h1 className={this.state.clicked ? "down sb" : "up sb"}>Search Result</h1>
        </div>
        <TvList getcast={this.getcast} main={true} data={this.state.clicked ? this.state.search : this.state.genres} popup={this.popup}/>
        <TvDesc open={this.state.open} selected={this.state.selected} cast={this.state.cast} toggle={this.toggle}/>
        <Pagination clicked={this.state.clicked} pages={this.state.pages} paginate={this.paginateGenres}/>
      </div>
    );
}

  animation = () => {
    this.getGenres(16)
    return(
      <div className="main">
        <input type="text" placeholder="Search TV Shows" className={this.state.clicked ? "bar down" : "bar up"} onChange={(e) => this.getSearch(e.target.value)}/>
        <div id="top">
          <h1 className={this.state.clicked ? "up" : "down"} >Animated TV Shows</h1>
          <h1 className={this.state.clicked ? "down sb" : "up sb"}>Search Result</h1>
        </div>
        <TvList getcast={this.getcast} main={true} data={this.state.clicked ? this.state.search : this.state.genres} popup={this.popup}/>
        <TvDesc open={this.state.open} selected={this.state.selected} cast={this.state.cast} toggle={this.toggle}/>
        <Pagination clicked={this.state.clicked} pages={this.state.pages} paginate={this.paginateGenres}/>
      </div>
      );
  }

  comedy = () => {
    this.getGenres(35)
    return(
      <div className="main">
        <input type="text" placeholder="Search TV Shows" className={this.state.clicked ? "bar down" : "bar up"} onChange={(e) => this.getSearch(e.target.value)}/>
        <div id="top">
          <h1 className={this.state.clicked ? "up" : "down"} >Comedy TV Shows</h1>
          <h1 className={this.state.clicked ? "down sb" : "up sb"}>Search Result</h1>
        </div>
        <TvList getcast={this.getcast} main={true} data={this.state.clicked ? this.state.search : this.state.genres} popup={this.popup}/>
        <TvDesc open={this.state.open} selected={this.state.selected} cast={this.state.cast} toggle={this.toggle}/>
        <Pagination clicked={this.state.clicked} pages={this.state.pages} paginate={this.paginateGenres}/>
      </div>
      );
  }

  drama = () => {
    this.getGenres(18)
    return (
      <div className="main">
        <input type="text" placeholder="Search TV Shows" className={this.state.clicked ? "bar down" : "bar up"} onChange={(e) => this.getSearch(e.target.value)}/>
        <div id="top">
          <h1 className={this.state.clicked ? "up" : "down"} >Drama TV Shows</h1>
          <h1 className={this.state.clicked ? "down sb" : "up sb"}>Search Result</h1>
        </div>
        <TvList getcast={this.getcast} main={true} data={this.state.clicked ? this.state.search : this.state.genres} popup={this.popup}/>
        <TvDesc open={this.state.open} selected={this.state.selected} cast={this.state.cast} toggle={this.toggle}/>
        <Pagination clicked={this.state.clicked} pages={this.state.pages} paginate={this.paginateGenres}/>
      </div>
      );
  }

  documentary = () => {
    this.getGenres(99)
    return (
      <div className="main">
        <input type="text" placeholder="Search TV Shows" className={this.state.clicked ? "bar down" : "bar up"} onChange={(e) => this.getSearch(e.target.value)}/>
        <div id="top">
          <h1 className={this.state.clicked ? "up" : "down"} >Documented TV Shows</h1>
          <h1 className={this.state.clicked ? "down sb" : "up sb"}>Search Result</h1>
        </div>
        <TvList getcast={this.getcast} main={true} data={this.state.clicked ? this.state.search : this.state.genres} popup={this.popup}/>
        <TvDesc open={this.state.open} selected={this.state.selected} cast={this.state.cast} toggle={this.toggle}/>
        <Pagination clicked={this.state.clicked} pages={this.state.pages} paginate={this.paginateGenres}/>
      </div>
      );
  }

  family = () => {
    this.getGenres(10751)
    return (
      <div className="main">
        <input type="text" placeholder="Search TV Shows" className={this.state.clicked ? "bar down" : "bar up"} onChange={(e) => this.getSearch(e.target.value)}/>
        <div id="top">
          <h1 className={this.state.clicked ? "up" : "down"} >Family TV Shows</h1>
          <h1 className={this.state.clicked ? "down sb" : "up sb"}>Search Result</h1>
        </div>
        <TvList getcast={this.getcast} main={true} data={this.state.clicked ? this.state.search : this.state.genres} popup={this.popup}/>
        <TvDesc open={this.state.open} selected={this.state.selected} cast={this.state.cast} toggle={this.toggle}/>
        <Pagination clicked={this.state.clicked} pages={this.state.pages} paginate={this.paginateGenres}/>
      </div>
      );
  }

	render() {
		return (
		<div>
    <BrowserRouter>

      <Route exact path="/" component={App}/>

      <Route path="/tv" render={props=> (
        <div>
        <header>
          <div className="above">
            <Link to="/" className="header"><h1>ShowBiz</h1></Link>
          </div>
          <nav>
            <Link to="/movies" className="nav" onClick={() => this.props.getmovies()} >Movies</Link> <Link to="/tv" className="nav">TV Shows</Link>
            <img className="search" onClick={() => this.getClicked()} src="/images/search.jpg"/>
          </nav>
        </header>

        <div className="genres" onClick={() => this.getTap()}>
          <h3 >Genres ↓</h3>
          <Link to="/tv/action" onClick={() => this.action()} className={this.state.tap ? "show" : "hide"}>Action</Link>
          <Link to="/tv/animation" onClick={() => this.animation()} className={this.state.tap ? "show" : "hide"}>Animation</Link>
          <Link to="/tv/comedy" onClick={() => this.comedy()} className={this.state.tap ? "show" : "hide"}>Comedy</Link>
          <Link to="/tv/drama" onClick={() => this.drama()} className={this.state.tap ? "show" : "hide"}>Drama</Link>
          <Link to="/tv/documentary" onClick={() => this.documentary()} className={this.state.tap ? "show" : "hide"}>Documentary</Link>
          <Link to="/tv/family" onClick={() => this.family()} className={this.state.tap ? "show" : "hide"}>Family</Link>
        </div>
        </div>      
        )} />
      
      <Route exact path="/tv" render={props=> (
      <div>
      
			<div className="main">
        <input type="text" placeholder="Search Tv Shows" className={this.state.clicked ? "bar down" : "bar up"} onChange={(e) => this.getSearch(e.target.value)}/>
        <div id="top">
          <h1 className={this.state.clicked ? "up" : "down"} >Popular TV Shows</h1>
          <h1 className={this.state.clicked ? "down sb" : "up sb"}>Search Result</h1>
        </div>
        <TvList getcast={this.getcast} main={true} data={this.state.clicked ? this.state.search : this.state.shows} popup={this.popup}/>
        <Pagination clicked={this.state.clicked} pages={this.state.pages} paginate={this.paginate}/>
        <TvDesc open={this.state.open} selected={this.state.selected} cast={this.state.cast} toggle={this.toggle}/>
      </div>
      </div>
      )} />

      <Route path="/movies" component={App}/>


      <Route path="/tv/action" render={props=> (
        this.action()
        )}/>

      <Route path="/tv/animation" render={props=> (
        this.animation()
        )}/>

      <Route path="/tv/comedy" render={props=> (            
        this.comedy()
      )}/>

      <Route path="/tv/drama" render={props=> (            
        this.drama()
      )}/>

      <Route path="/tv/documentary" render={props=> (            
        this.documentary()
      )}/>

      <Route path="/tv/family" render={props=> (            
        this.family()
      )}/>

      <Route path ="/tv" render={props=> ( 
        <footer>
          <p className="footer">Copyrights</p>
        </footer>
      )} />

      </BrowserRouter>
		</div>);
	}
}


export default Latest;
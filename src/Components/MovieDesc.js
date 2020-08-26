import React from "react";

import MoviesList from "./MoviesList";

const MovieDesc = (props) => {
	return (
		<div className={props.open ? "description on" : "description off"}>
			<div className="dmain">
				<img className="cross" onClick={() => props.toggle()} src="/images/cross.svg"/>
				<img className="dposter" src={`http://image.tmdb.org/t/p/w185${props.selected.poster_path}`} />
	
					<h2 className="dtitle">{props.selected.original_title}</h2>
					<h3 className="drating">Rating: {props.selected.vote_average}</h3>
					
					<p className="doverview">{props.selected.overview}</p>
					{
						props.data.length == 0
						?
						<div>
						</div>
						:
						<div>
							<h2>Similar Movies:</h2>
							<MoviesList main={false} data={props.data} popup={props.popup} similar={props.similar}/>
						</div>
					}
			</div>
		</div>
		)
}

export default MovieDesc;
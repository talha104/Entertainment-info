import React from "react";

import TvCast from "./TvCast";

const TvDesc = (props) => {
	return (
		<div className={props.open ? "description on" : "description off"}>
			<div className="dmain">
				<img className="cross" onClick={() => props.toggle()} src="/images/cross.svg"/>
				<img className="dposter" src={`http://image.tmdb.org/t/p/w185${props.selected.poster_path}`} />
	
					<h2 className="dtitle">{props.selected.original_title}</h2>
					<h3 className="drating">Rating: {props.selected.vote_average}</h3>
					
					<p className="doverview">{props.selected.overview}</p>

					{
						props.cast.length == 0
						?
						<div>
						</div>
						:
						<div>
							<h3>Cast:</h3>
							<div className="cast">
							{props.cast.map( response =>
								<TvCast
								poster={response.profile_path}
								character={response.character}
								name={response.name}
								/>
							)}
							</div>
						</div>
					}

			</div>
		</div>
		)
}

export default TvDesc;
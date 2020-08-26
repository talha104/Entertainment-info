import React from "react";

const TvCast = (props) => {
	return (
		<div className="citem">
			<img className="cposter" alt={props.name} src={`http://image.tmdb.org/t/p/w185${props.poster}`} />
			<div className="crating">
				<h3 className="character">Character: {props.character}</h3>
				<h3 className="cname">Name: {props.name}</h3>
			</div>
		</div>
		)
}

export default TvCast;
import React from "react";

const Movies = (props) => {
	return (
		props.main
			?
		<a href="#top">
		<div className="item" onClick={() => {
			props.popup(props.id)
			props.similar(props.id)
		}
		}>
			<img className="poster" alt={props.title} src={`http://image.tmdb.org/t/p/w185${props.poster}`} />
			<div className="rating-container">
				<h3 className="title">{props.title}</h3>
				<h3 className="name">{props.name}</h3>
				<h3 className="rating">Rating: {props.rating}</h3>
			</div>
		</div>
		</a>
		:
		<a href="#top">
		<div className="fitem" onClick={() => {
			props.popup(props.id)
			props.similar(props.id)
		}
		}>
			<img className="fposter" alt={props.title} src={`http://image.tmdb.org/t/p/w185${props.poster}`} />
			<div className="frating-container">
				<h3 className="ftitle">{props.title}</h3>
				<h3 className="fname">{props.name}</h3>
				<h3 className="frating">Rating: {props.rating}</h3>
			</div>
		</div>
		</a>
	)
}

export default Movies;
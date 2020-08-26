import React from "react";

const Tv = (props) => {
	return (
		<a href="#top">
		<div className="item" onClick={() => {
			props.popup(props.id)
			props.getcast(props.id)
		}
		}>
			<img className="poster" alt={props.name} src={`http://image.tmdb.org/t/p/w185${props.poster}`} />
			<div className="rating-container">
				<h3 className="title">{props.title}</h3>
				<h3 className="name">{props.name}</h3>
				<h3 className="rating">Rating: {props.rating}</h3>
			</div>
		</div>
		</a>
		)
}

export default Tv;
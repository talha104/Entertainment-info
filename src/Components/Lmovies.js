import React from "react";

const Lmovies = (props) => {
	return (
			props.show
			?
			<a href="#top">
			<div className={props.main ? "litem" : "nitem"} onClick={() => {
				props.popup(props.id)
				props.getcast(props.id)
			}
			}>
				<img className={props.main ? "lposter" : "nposter"} alt={props.title} src={`http://image.tmdb.org/t/p/w185${props.poster}`} />
				<div className={props.main ? "lrating-container" : "nrating-container"}>
					<h3 className={props.main ? "ltitle" : "ntitle"}>{props.title}</h3>
					<h3 className={props.main ? "lname" : "nname"}>{props.name}</h3>
					<h3 className={props.main ? "lrating" : "nrating"}>Rating: {props.rating}</h3>
				</div>
			</div>
			</a>
			:
			<a href="#top">
			<div className={props.main ? "litem" : "nitem"} onClick={() => {
				props.popup(props.id)
				props.similar(props.id)
			}
			}>
				<img className={props.main ? "lposter" : "nposter"} alt={props.title} src={`http://image.tmdb.org/t/p/w185${props.poster}`} />
				<div className={props.main ? "lrating-container" : "nrating-container"}>
					<h3 className={props.main ? "ltitle" : "ntitle"}>{props.title}</h3>
					<h3 className={props.main ? "lname" : "nname"}>{props.name}</h3>
					<h3 className={props.main ? "lrating" : "nrating"}>Rating: {props.rating}</h3>
				</div>
			</div>
			</a>
	)
}

export default Lmovies;
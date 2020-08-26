import React from "react";
import Movies from "./Movies";

const MoviesList = (props) => {

	const all = props.main
		? props.data.map( response => 
		<Movies 
		poster={response.poster_path}
		title={response.title}
		name={response.name}
		key={response.id}
		id={response.id}
		overview={response.overview}
		rating={response.vote_average}
		popup={props.popup}
		similar={props.similar}
		main={props.main}
		/>
	)
	:
	props.data.map( response => 
		<Movies 
		poster={response.poster_path}
		title={response.title}
		name={response.name}
		key={response.id}
		id={response.id}
		overview={response.overview}
		rating={response.vote_average}
		popup={props.popup}
		similar={props.similar}
		main={props.main}
		/>
		)

	return (
		<div className={props.main ?"wrapper" : "fwrapper"}>
			{all}
		</div>
		);
}

export default MoviesList;
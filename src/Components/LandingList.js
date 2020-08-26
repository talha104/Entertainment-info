import React from "react";
import Lmovies from "./Lmovies";

const LandingList = (props) => {

	const all = 
	props.show
	?
	props.data.map( response => 
		<Lmovies 
		poster={response.poster_path}
		title={response.title}
		name={response.name}
		key={response.id}
		id={response.id}
		overview={response.overview}
		rating={response.vote_average}
		popup={props.popup}
		main={props.main}
		show={props.show}
		getcast={props.getcast}
		/>
		)
	:
	props.data.map( response => 
		<Lmovies 
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
		show={props.show}
		/>
		)

	return (
		<div className={props.main ? "lwrapper" : "nwrapper"}>
			{all}
		</div>
		);
}

export default LandingList;
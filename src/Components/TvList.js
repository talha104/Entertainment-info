import React from "react";
import Tv from "./Tv";

const TvList = (props) => {

	const all = props.data.map( response => 
		<Tv
		poster={response.poster_path}
		title={response.title}
		name={response.name}
		key={response.id}
		id={response.id}
		overview={response.overview}
		rating={response.vote_average}
		popup={props.popup}
		main={props.main}
		getcast={props.getcast}
		/>
	)

	return (
		<div className="wrapper">
			{all}
		</div>
		);
}

export default TvList;
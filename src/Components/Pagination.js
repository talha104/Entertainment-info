import React from "react";

const Pagination = (props) => {
	const pageNumbers = []

	for(let i=1;i<=props.pages;i++)
	{
		pageNumbers.push(i)
	}

	return (
		<div className={props.clicked ? "pages up" : "pages down"} >
			{pageNumbers.map(number => (
				<a key={number} onClick={() => props.paginate(number)} href='#'>
					<button>{number}</button>
				</a>
			))}
		</div>
		);
}

export default Pagination;
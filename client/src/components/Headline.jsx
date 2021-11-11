import React from "react";

const Headline = ({ title, desc }) => {
	return (
		<div className="flex flex-col items-center my-5">
			<h1 className="text-2xl font-bold">{title}</h1>
			<p>{desc}</p>
		</div>
	);
};

export default Headline;

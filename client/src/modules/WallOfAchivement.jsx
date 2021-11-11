import React from "react";
import Card from "../components/Card";
import NewCard from "../components/Modal";

const WallOfAchivement = ({ data }) => {
	return (
		<div className="w-auto flex flex-wrap mt-5">
			<NewCard />
			{data.map((item) => (
				<Card id={item.id} title={item.title} content={item.content} />
			))}
		</div>
	);
};

export default WallOfAchivement;

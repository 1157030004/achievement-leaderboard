import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import NewCard from "../components/Modal";
import useStore from "../store";

const WallOfAchivement = ({ data }) => {
	const academics = useStore((state) => state.academics);
	const getAcademics = useStore((state) => state.getAcademics);

	const [source, setSource] = useState([]);

	useEffect(() => {
		getAcademics();
		setSource(academics);
		console.log(source);
	}, []);
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

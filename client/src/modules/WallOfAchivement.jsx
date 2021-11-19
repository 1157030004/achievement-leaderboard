import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import NewCard from "../components/Modal";
import { useStore, useAuthStore } from "../store";

const WallOfAchivement = ({ source }) => {
	const state = useStore((state) => state);
	// const academics = useStore((state) => state.academics);
	// const getAcademics = useStore((state) => state.getAcademics);

	// useEffect(() => {
	// 	getAcademics();

	// }, []);

	return (
		<div className="w-auto flex flex-wrap ">
			{source.map((item) => (
				<Card
					key={item._id}
					id={item._id}
					title={item.title}
					activity={item.activity}
					level={item.level}
					score={item.score}
					status={item.status}
					proof={item.proof}
				/>
			))}
		</div>
	);
};

export default WallOfAchivement;

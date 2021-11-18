import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import NewCard from "../components/Modal";
import { useStore, useAuthStore } from "../store";

const WallOfAchivement = ({ data }) => {
	const state = useStore((state) => state);
	const academics = useStore((state) => state.academics);
	const getAcademics = useStore((state) => state.getAcademics);

	useEffect(() => {
		getAcademics();
		// if (academics.data.length > 0) {
		// 	setAcademicSource(academics.data);
		// }
	}, []);

	return (
		<div className="w-auto flex flex-wrap mt-5">
			<NewCard />
			{state.isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					{academics.data.map((item) => (
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
				</>
			)}
		</div>
	);
};

export default WallOfAchivement;

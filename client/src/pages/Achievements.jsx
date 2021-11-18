import React, { useEffect } from "react";
import WallOfAchivement from "../modules/WallOfAchivement";
import { useStore } from "../store";
import NewCard from "../components/Modal";

const Achievements = () => {
	const state = useStore((state) => state);
	const academics = useStore((state) => state.academics);
	const getAcademics = useStore((state) => state.getAcademics);
	const competitions = useStore((state) => state.competitions);
	const getCompetitions = useStore((state) => state.getCompetitions);

	useEffect(() => {
		getAcademics();
		getCompetitions();
	}, []);
	return (
		<div className="flex flex-col w-full">
			<NewCard />
			<WallOfAchivement source={academics} />
			<div class="divider" />
			<WallOfAchivement source={competitions} />
		</div>
	);
};

export default Achievements;

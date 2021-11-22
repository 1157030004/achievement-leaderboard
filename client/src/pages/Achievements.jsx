import React, { useEffect, useRef, useState } from "react";
import WallOfAchivement from "../modules/WallOfAchivement";
import { useStore } from "../store";
import NewCard from "../components/Modal";
import Stat from "../components/Stat";

const Achievements = () => {
	const state = useStore((state) => state);
	const academics = useStore((state) => state.academics);
	const getAcademics = useStore((state) => state.getAcademics);
	const competitions = useStore((state) => state.competitions);
	const getCompetitions = useStore((state) => state.getCompetitions);

	const [tab, setTab] = useState("academic");

	useEffect(() => {
		getAcademics();
		getCompetitions();
	}, [tab]);

	const handleChange = (e) => {
		setTab(e.target.name);
	};

	if (state.isLoading) {
		return <div>Loading...</div>;
	}

	if (!academics || !competitions) {
		return <div>No data</div>;
	}

	return (
		<div className="flex flex-col w-full">
			<div className="flex flex-row justify-between mt-2 mx-2 ">
				<Stat handleChange={handleChange} tab={tab} />
				<NewCard />
			</div>
			{tab === "academic" ? (
				<WallOfAchivement source={academics} tab={tab} />
			) : tab === "competition" ? (
				<WallOfAchivement source={competitions} tab={tab} />
			) : (
				<div>organization</div>
			)}
		</div>
	);
};

export default Achievements;

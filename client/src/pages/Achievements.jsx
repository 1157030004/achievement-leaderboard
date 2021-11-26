import React, { useEffect } from "react";
import Helmet from "react-helmet";
import WallOfAchivement from "../modules/WallOfAchivement";
import { useStore } from "../store";
import NewCard from "../components/Modal";
import Stat from "../components/Stat";
import Loading from "../components/Loading";

const Achievements = () => {
	const state = useStore((state) => state);
	const academics = useStore((state) => state.academics);
	const getAcademics = useStore((state) => state.getAcademics);
	const competitions = useStore((state) => state.competitions);
	const getCompetitions = useStore((state) => state.getCompetitions);
	const organizations = useStore((state) => state.organizations);
	const getOrganizations = useStore((state) => state.getOrganizations);
	const addCategory = useStore((state) => state.addCategory);

	useEffect(() => {
		getAcademics();
		getCompetitions();
		getOrganizations();
	}, [state.category]);

	const handleChange = (e) => {
		addCategory(e.target.name);
	};

	if (state.isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Helmet>
				<title>Leaderboard Aktivis Salman - Daftar Prestasi</title>
				<meta
					name="description"
					content={`Daftar prestasi ${state.category} aktivis Masjid Salman ITB`}
				/>
			</Helmet>
			<div className="flex flex-col w-full">
				<div className="flex flex-row justify-between mt-2 mx-2 ">
					<Stat handleChange={handleChange} tab={state.category} />
					<NewCard />
				</div>
				{state.category === "academic" ? (
					<WallOfAchivement source={academics} tab={state.category} />
				) : state.category === "competition" ? (
					<WallOfAchivement source={competitions} tab={state.category} />
				) : (
					<WallOfAchivement source={organizations} tab={state.category} />
				)}
			</div>
		</>
	);
};

export default Achievements;

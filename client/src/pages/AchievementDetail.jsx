import React, { useEffect } from "react";
import { useParams } from "react-router";
import AcademicForm from "../modules/AcademicForm";
import CompetitionForm from "../modules/CompetitionForm";
import { useStore } from "../store";

const AchievementDetail = () => {
	const state = useStore((state) => state);
	const academic = useStore((state) => state.academic);
	const competition = useStore((state) => state.competition);
	const getOneAcademic = useStore((state) => state.getOneAcademic);
	const getOneCompetition = useStore((state) => state.getOneCompetition);
	let params = useParams();

	useEffect(() => {
		if (state.category === "academic") {
			getOneAcademic(params.id);
		} else if (state.category === "competition") {
			getOneCompetition(params.id);
		} else {
			console.log("organizaton");
		}
	}, []);

	if (state.isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			{state.category === "academic" ? (
				<AcademicForm source={academic} />
			) : state.category === "competition" ? (
				<CompetitionForm source={competition} />
			) : (
				<div>organization</div>
			)}
		</>
	);
};

export default AchievementDetail;

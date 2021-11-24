import React, { useEffect } from "react";
import { useParams } from "react-router";
import Helmet from "react-helmet";
import AcademicForm from "../modules/AcademicForm";
import CompetitionForm from "../modules/CompetitionForm";
import OrganizationForm from "../modules/OrganizationForm";
import { useStore } from "../store";

const AchievementDetail = () => {
	const state = useStore((state) => state);
	const academic = useStore((state) => state.academic);
	const competition = useStore((state) => state.competition);
	const organization = useStore((state) => state.organization);
	const getOneAcademic = useStore((state) => state.getOneAcademic);
	const getOneCompetition = useStore((state) => state.getOneCompetition);
	const getOneOrganization = useStore((state) => state.getOneOrganization);
	let params = useParams();

	useEffect(() => {
		if (state.category === "academic") {
			getOneAcademic(params.id);
		}
		if (state.category === "competition") {
			getOneCompetition(params.id);
		}
		if (state.category === "organization") {
			getOneOrganization(params.id);
		}
	}, []);

	if (state.isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Helmet>
				<title>Leaderboard Aktivis Salman - Detail Prestasi</title>
				<meta
					name="description"
					content={`Detail prestasi ${state.category} aktivis Masjid Salman ITB`}
				/>
			</Helmet>
			{state.category === "academic" ? (
				<AcademicForm source={academic} />
			) : state.category === "competition" ? (
				<CompetitionForm source={competition} />
			) : (
				<OrganizationForm source={organization} />
			)}
		</>
	);
};

export default AchievementDetail;

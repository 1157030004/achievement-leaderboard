import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Helmet from "react-helmet";
import AdminAcademicForm from "../modules/AdminAcademicForm";
import AdminCompetitionForm from "../modules/AdminCompetitionForm";
import AdminOrganizationForm from "../modules/AdminOrganizationForm";
import { useStore } from "../store";
import Loading from "../components/Loading";

const AdminDetail = () => {
	const params = useParams();
	const state = useStore((state) => state);

	//? Academic
	const adminAcademic = useStore((state) => state.adminAcademic);
	const getAdminOneAcademic = useStore((state) => state.getAdminOneAcademic);
	const academicActivities = useStore((state) => state.academicActivities);
	const academicLevels = useStore((state) => state.academicLevels);
	const getAcademicActivities = useStore(
		(state) => state.getAcademicActivities
	);
	const getAcademicLevels = useStore((state) => state.getAcademicLevels);

	//? Organization
	const adminOrganization = useStore((state) => state.adminOrganization);
	const getAdminOneOrganization = useStore(
		(state) => state.getAdminOneOrganization
	);
	const organizationActivities = useStore(
		(state) => state.organizationActivities
	);
	const organizationLevels = useStore((state) => state.organizationLevels);
	const getOrganizationActivities = useStore(
		(state) => state.getOrganizationActivities
	);
	const getOrganizationLevels = useStore(
		(state) => state.getOrganizationLevels
	);

	//? Competition
	const adminCompetition = useStore((state) => state.adminCompetition);
	const getAdminOneCompetition = useStore(
		(state) => state.getAdminOneCompetition
	);
	const competitionActivities = useStore(
		(state) => state.competitionActivities
	);
	const competitionLevels = useStore((state) => state.competitionLevels);
	const getCompetitionActivities = useStore(
		(state) => state.getCompetitionActivities
	);
	const getCompetitionLevels = useStore((state) => state.getCompetitionLevels);

	const statusCategory = ["Pilih", "Reviewed", "Approved", "Rejected"];

	useEffect(() => {
		if (state.category === "academic") {
			getAdminOneAcademic(params.id);
			getAcademicActivities();
			getAcademicLevels();
		} else if (state.category === "competition") {
			getAdminOneCompetition(params.id);
			getCompetitionActivities();
			getCompetitionLevels();
		} else {
			getAdminOneOrganization(params.id);
			getOrganizationActivities();
			getOrganizationLevels();
		}
	}, []);

	if (state.isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Helmet>
				<title>Admin Leaderboard Aktivis Salman - Detail Prestasi</title>
				<meta
					name="description"
					content={`Daftar prestasi ${state.category} aktivis Masjid Salman ITB`}
				/>
			</Helmet>
			{state.category === "academic" ? (
				<AdminAcademicForm
					source={adminAcademic}
					activities={academicActivities}
					levels={academicLevels}
					statusCategory={statusCategory}
				/>
			) : state.category === "competition" ? (
				<AdminCompetitionForm
					source={adminCompetition}
					activities={competitionActivities}
					levels={competitionLevels}
					statusCategory={statusCategory}
				/>
			) : (
				<AdminOrganizationForm
					source={adminOrganization}
					activities={organizationActivities}
					levels={organizationLevels}
					statusCategory={statusCategory}
				/>
			)}
		</>
	);
};

export default AdminDetail;

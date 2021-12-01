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
	const adminAcademic = useStore((state) => state.adminAcademic);
	const adminCompetition = useStore((state) => state.adminCompetition);
	const adminOrganization = useStore((state) => state.adminOrganization);
	const getAdminOneAcademic = useStore((state) => state.getAdminOneAcademic);
	const getAdminOneCompetition = useStore(
		(state) => state.getAdminOneCompetition
	);
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

	const statusCategory = ["Pilih", "Reviewed", "Approved", "Rejected"];

	useEffect(() => {
		if (state.category === "academic") {
			getAdminOneAcademic(params.id);
		} else if (state.category === "competition") {
			getAdminOneCompetition(params.id);
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
			{/* <Helmet>
				<title>Admin Leaderboard Aktivis Salman - Detail Prestasi</title>
				<meta
					name="description"
					content={`Daftar prestasi ${state.category} aktivis Masjid Salman ITB`}
				/>
			</Helmet>
			{state.category === "academic" ? (
				<AdminAcademicForm source={adminAcademic} />
			) : state.category === "competition" ? (
				<AdminCompetitionForm source={adminCompetition} />
			) : (
				<AdminOrganizationForm
					source={adminOrganization}
					activities={organizationActivities}
					levels={organizationLevels}
					statusCategory={statusCategory}
				/>
			)} */}
		</>
	);
};

export default AdminDetail;

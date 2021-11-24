import React, { useEffect } from "react";
import Helmet from "react-helmet";
import AdminTable from "../components/AdminTable";
import Stat from "../components/Stat";
import { useStore } from "../store";

const AdminHome = () => {
	const state = useStore((state) => state);
	const addCategory = useStore((state) => state.addCategory);
	const adminAcademics = useStore((state) => state.adminAcademics);
	const adminCompetitions = useStore((state) => state.adminCompetitions);
	const adminOrganizations = useStore((state) => state.adminOrganizations);
	const getAdminAllAcademics = useStore((state) => state.getAdminAllAcademics);
	const getAdminAllCompetitions = useStore(
		(state) => state.getAdminAllCompetitions
	);
	const getAdminAllOrganizations = useStore(
		(state) => state.getAdminAllOrganizations
	);

	useEffect(() => {
		if (state.category === "academic") {
			getAdminAllAcademics();
		} else if (state.category === "competition") {
			getAdminAllCompetitions();
		} else {
			getAdminAllOrganizations();
		}
	}, [state.category]);

	const handleChange = (e) => {
		addCategory(e.target.name);
	};

	if (state.isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Helmet>
				<title>Admin Leaderboard Aktivis Salman - Daftar Prestasi</title>
				<meta
					name="description"
					content={`Daftar prestasi ${state.category} aktivis Masjid Salman ITB`}
				/>
			</Helmet>
			<div className="flex flex-col w-full">
				<div className="flex flex-row justify-between mt-2 mx-2 ">
					<Stat handleChange={handleChange} tab={state.category} />
				</div>
				{state.category === "academic" ? (
					<AdminTable source={adminAcademics} />
				) : state.category === "competition" ? (
					<AdminTable source={adminCompetitions} />
				) : (
					<AdminTable source={adminOrganizations} />
				)}
			</div>
		</>
	);
};

export default AdminHome;

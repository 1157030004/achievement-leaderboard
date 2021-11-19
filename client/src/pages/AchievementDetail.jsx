import React, { useEffect } from "react";
import { useParams } from "react-router";
import AcademicForm from "../modules/AcademicForm";
import { useStore } from "../store";

const AchievementDetail = () => {
	const state = useStore((state) => state);
	const academic = useStore((state) => state.academic);
	const getOneAcademic = useStore((state) => state.getOneAcademic);
	let params = useParams();

	useEffect(() => {
		getOneAcademic(params.id);
	}, []);

	if (state.isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<AcademicForm source={academic} />
		</>
	);
};

export default AchievementDetail;

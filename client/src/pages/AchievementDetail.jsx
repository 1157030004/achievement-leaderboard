import React, { useEffect } from "react";
import { useParams } from "react-router";
import AcademicForm from "../modules/AcademicForm";
import { useStore } from "../store";

const AchievementDetail = (props) => {
	const academic = useStore((state) => state.academic);
	const getOneAcademic = useStore((state) => state.getOneAcademic);
	let params = useParams();

	useEffect(() => {
		getOneAcademic(params.id);
	}, []);

	console.log(academic);
	return (
		<>
			<AcademicForm />
		</>
	);
};

export default AchievementDetail;

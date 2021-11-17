import React from "react";
import AcademicForm from "../modules/AcademicForm";
import CompetitionForm from "../modules/CompetitionForm";
import useStore from "../store";

const NewAchievement = (props) => {
	const category = useStore((state) => state.category);
	console.log(category);
	return (
		<div>
			{category === "academic" ? (
				<AcademicForm {...props} />
			) : category === "competition" ? (
				<CompetitionForm {...props} />
			) : (
				<div>Organization</div>
			)}
		</div>
	);
};

export default NewAchievement;

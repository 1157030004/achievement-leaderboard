import React from "react";
import AcademicForm from "../modules/AcademicForm";
import CompetitionForm from "../modules/CompetitionForm";
import OrganizationForm from "../modules/OrganizationForm";
import { useStore } from "../store";

const NewAchievement = (props) => {
	const category = useStore((state) => state.category);
	return (
		<div>
			{category === "academic" ? (
				<AcademicForm {...props} />
			) : category === "competition" ? (
				<CompetitionForm {...props} />
			) : (
				<OrganizationForm {...props} />
			)}
		</div>
	);
};

export default NewAchievement;

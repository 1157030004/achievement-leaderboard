import React from "react";
import AcademicForm from "../modules/AcademicForm";
import CompetitionForm from "../modules/CompetitionForm";
import OrganizationForm from "../modules/OrganizationForm";
import { useStore } from "../store";

const NewAchievement = (props) => {
	const category = useStore((state) => state.category);
	const [source, setSource] = React.useState({
		title: "",
		activity: "",
		level: "",
	});
	return (
		<div>
			{category === "academic" ? (
				<AcademicForm source={source} />
			) : category === "competition" ? (
				<CompetitionForm source={source} />
			) : (
				<OrganizationForm source={source} />
			)}
		</div>
	);
};

export default NewAchievement;

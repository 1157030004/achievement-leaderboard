import React from "react";
import WallOfAchivement from "../modules/WallOfAchivement";
import { useStore } from "../store";

const Achievements = () => {
	const user = useStore((state) => state.user);
	const data = [
		{
			id: "1",
			title:
				"First Card asdkjasdoajsdljasdojasodjasodj asodjasoidjsaiodjasoidj",
			content: "This is the first card",
		},
		{ id: "2", title: "Second Card", content: "This is the second card" },
		{ id: "3", title: "Third Card", content: "This is the third card" },
		{
			id: "4",
			title: "Fourth Card",
			content: "This is the fourth card",
		},
		{ id: "5", title: "Fifth Card", content: "This is the fifth card" },
	];
	return (
		<>
			<WallOfAchivement data={data} />
		</>
	);
};

export default Achievements;

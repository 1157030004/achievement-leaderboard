import { Edit, Trash } from "iconsax-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store";

const Card = ({ id, title }) => {
	const deleteAcademic = useStore((state) => state.deleteAcademic);
	const navigate = useNavigate();

	const handleClick = (e) => {
		e.preventDefault();
		navigate(`/achievements/${id}`);
	};

	const handleDelete = (e) => {
		e.preventDefault();
		deleteAcademic(id);
	};
	return (
		<>
			<div className="card m-2 max-w-sm  text-center shadow-2xl lg:card-side bg-accent text-accent-content">
				<div className=" card-body ">
					<h1 className="text-md font-extrabold">{title}</h1>
					<div className=" justify-center card-actions ">
						<button className="btn btn-sm btn-accent" onClick={handleClick}>
							<Edit size="14" variant="Outline" />
						</button>
						<button className="btn btn-sm btn-accent" onClick={handleDelete}>
							<Trash size="14" variant="Outline" />
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Card;

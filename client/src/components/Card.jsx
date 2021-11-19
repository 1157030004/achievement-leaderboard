import { Edit, Trash } from "iconsax-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import Popup from "./Popup";

const Card = ({ id, title, activity, level, score, status, proof }) => {
	const deleteAcademic = useStore((state) => state.deleteAcademic);
	const navigate = useNavigate();

	const handleClick = (e) => {
		e.preventDefault();
		navigate(`/achievements/${id}`);
	};

	// function render header

	const handleDelete = (e) => {
		e.preventDefault();
		deleteAcademic(id);
	};
	return (
		<>
			<div className="card m-2 w-full  shadow-2xl lg:card-side bg-neutral-content">
				<div className=" card-body ">
					<div className="flex flex-row items-start relative">
						<div className=" w-2/5 lg:w-1/5 mr-2 rounded-lg">
							<img src={proof} className="bg-base-100 rounded-lg" alt="proof" />
						</div>

						<div className="w-full flex flex-col text-2xs lg:text-xs">
							<span className="  font-extrabold">{title}</span>
							<span className="">{activity}</span>
							<span className="">{level}</span>
							<span className="text-2xs lg:text-xs rounded-lg bg-base-100 w-24 p-1">
								Score: {score}
							</span>
						</div>
					</div>
					<div className="flex items-center text-primary-content text-2xs lg:text-xs absolute left-17 top-1">
						{status === "pending" ? (
							<span className="bg-primary p-1 rounded-lg">{status}</span>
						) : (
							<span className="bg-secondary p-1 rounded-lg">{status}</span>
						)}
					</div>

					<div className="flex justify-end">
						<button
							className="btn btn-sm btn-accent mx-2 rounded-lg"
							onClick={handleClick}>
							<Edit size="14" variant="Outline" color="white" />
						</button>
						<button
							className="btn btn-sm btn-accent rounded-lg"
							onClick={handleDelete}>
							<Trash size="14" variant="Outline" color="white" />
						</button>
						{/* <Popup handleDelete={handleDelete} /> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default Card;

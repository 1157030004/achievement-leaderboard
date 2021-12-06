import { Edit, Trash } from "iconsax-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import Popup from "./Popup";

const Card = ({
	id,
	title,
	activity,
	level,
	score,
	status,
	year,
	proof,
	tab,
}) => {
	const addCategory = useStore((state) => state.addCategory);
	const deleteAcademic = useStore((state) => state.deleteAcademic);
	const deleteCompetition = useStore((state) => state.deleteCompetition);
	const deleteOrganization = useStore((state) => state.deleteOrganization);
	const navigate = useNavigate();

	const handleClick = (e) => {
		e.preventDefault();
		if (tab === "academic") {
			addCategory(tab);
			navigate(`/academics/${id}`);
		} else if (tab === "competition") {
			addCategory(tab);
			navigate(`/competitions/${id}`);
		} else {
			addCategory(tab);
			navigate(`/organizations/${id}`);
		}
	};

	// function render header

	const handleDelete = (e) => {
		e.preventDefault();
		if (tab === "academic") {
			deleteAcademic(id);
		} else if (tab === "competition") {
			deleteCompetition(id);
		} else {
			deleteOrganization(id);
		}
	};
	return (
		<>
			<div className="card m-2 w-full  shadow-2xl lg:card-side bg-neutral-content">
				<div className=" card-body ">
					<div className="flex flex-row items-center relative">
						<div className=" w-2/5 lg:w-1/5 mr-2 rounded-lg">
							<img src={proof} className="bg-base-100 rounded-lg" alt="proof" />
						</div>

						<div className="w-full flex flex-col">
							<span className="font-extrabold text-xs lg:text-lg mb-2">
								{title}
							</span>
							<span className="text-2xs lg:text-sm font-thin">{activity}</span>
							<span className="text-2xs lg:text-sm font-thin">{level}</span>
							<span className="text-2xs lg:text-sm font-thin">{year}</span>
						</div>

						<div className="flex flex-col items-center w-24 p-2 bg-base-100 text-base-content rounded-lg">
							<span className="text-2xs lg:text-sm font-light">Skor</span>
							<span className="text-2xs lg:text-sm font-bold">{score}</span>
						</div>
					</div>
					<div className="flex items-center text-primary-content text-2xs lg:text-xs absolute right-8 top-1">
						{status === "Reviewed" ? (
							<span className="bg-info p-1 rounded-lg">{status}</span>
						) : status === "Approved" ? (
							<span className=" bg-success p-1 rounded-lg">{status}</span>
						) : status === "Rejected" ? (
							<span className="bg-error p-1 rounded-lg">{status}</span>
						) : null}
					</div>

					<div className="flex justify-end">
						<button
							className="btn btn-sm btn-secondary mx-2 rounded-lg"
							onClick={handleClick}>
							<Edit size="14" variant="Outline" color="white" />
						</button>
						<button
							className="btn btn-sm btn-secondary rounded-lg"
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

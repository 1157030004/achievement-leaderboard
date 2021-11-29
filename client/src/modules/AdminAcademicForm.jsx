import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputLabel from "../components/InputLabel";
import { useStore } from "../store";

const AdminAcademicForm = ({ source }) => {
	const navigate = useNavigate();
	const params = useParams();
	const updateAdminAcademic = useStore((state) => state.updateAdminAcademic);
	const [inputs, setInputs] = useState({});

	const { title, activity, level, score, status, proof } = source;

	const handleChange = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		inputs.id = params.id;
		updateAdminAcademic(inputs);
		navigate("/admin");
	};
	return (
		<div className="mt-5 p-10 card bg-base-200">
			<form className="form-control" onSubmit={handleSubmit}>
				<h1 className="text-center font-extrabold">Formulir Tinjauan</h1>
				<div className="flex flex-col lg:flex-row justify-between">
					<div className="flex flex-col">
						<InputLabel label="Title" value={title} />
						<InputLabel label="Activity" value={activity} />
						<InputLabel label="Level" value={level} />
						<label className="label mt-2 font-bold block md:hidden">
							<span className="label-text">Bukti</span>
						</label>
						<img
							className="w-2/4 rounded-lg block md:hidden"
							src={proof}
							alt=""
						/>
						<label className="label mt-2 font-bold">
							<span className="label-text">Status</span>
						</label>
						<select
							name="status"
							className="select w-full"
							onChange={handleChange}>
							<option value="Pilih">Pilih</option>
							<option value="Reviewed">Reviewed</option>
							<option value="Rejected">Rejected</option>
							<option value="Approved">Approved</option>
						</select>
						<label className="label mt-2 font-bold">
							<span className="label-text">Status</span>
						</label>
						<input
							type="number"
							name="score"
							placeholder={score}
							className="input"
							onChange={handleChange}
						/>
					</div>
					<img
						className="w-2/4 rounded-lg hidden md:block"
						src={proof}
						alt=""
					/>
				</div>
				<button className="btn btn-primary mt-4">Submit</button>
			</form>
		</div>
	);
};

export default AdminAcademicForm;

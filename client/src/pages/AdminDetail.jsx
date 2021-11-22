import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../store";

const AdminDetail = () => {
	const params = useParams();
	const state = useStore((state) => state);
	const adminAcademic = useStore((state) => state.adminAcademic);
	const getAdminOneAcademic = useStore((state) => state.getAdminOneAcademic);

	const { title, activity, level, score, status, proof } = adminAcademic;

	const [inputs, setInputs] = useState({});

	useEffect(() => {
		getAdminOneAcademic(params.id);
	}, []);

	const handleChange = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	if (state.isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="mt-5 p-10 card bg-base-200">
			<form className="form-control" onSubmit={handleSubmit}>
				<div className="flex justify-between">
					<div className="flex flex-col">
						<span>{title}</span>
						<span>{activity}</span>
						<span>{level}</span>
						<select
							name="status"
							className="select w-full max-w-xs"
							onChange={handleChange}>
							<option value="Pilih">Pilih</option>
							<option value="Pending">Pending</option>
							<option value="Reviewed">Reviewed</option>
						</select>
						<label className="label mt-2">
							<span className="label-text">Score</span>
						</label>
						<input
							type="number"
							name="score"
							placeholder={score}
							className="input"
							onChange={handleChange}
						/>
					</div>
					<div className="bg-indigo-400">
						<img className="w-2/4 bg-indigo-700" src={proof} alt="" />
					</div>
				</div>
				<button className="btn btn-primary mt-4">Submit</button>
			</form>
		</div>
	);
};

export default AdminDetail;

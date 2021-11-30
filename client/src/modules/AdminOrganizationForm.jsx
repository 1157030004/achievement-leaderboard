import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../store";
import InputLabel from "../components/InputLabel";
import FormSelect from "../components/FormSelect";

const AdminOrganizationForm = (props) => {
	const navigate = useNavigate();
	const params = useParams();

	const getAdminOneOrganization = useStore(
		(state) => state.getAdminOneOrganization
	);
	const adminOrganization = useStore((state) => state.adminOrganization);

	const organizationActivities = useStore(
		(state) => state.organizationActivities
	);
	const organizationLevels = useStore((state) => state.organizationLevels);
	const getOrganizationActivities = useStore(
		(state) => state.getOrganizationActivities
	);
	const getOrganizationLevels = useStore(
		(state) => state.getOrganizationLevels
	);
	const updateAdminOrganization = useStore(
		(state) => state.updateAdminOrganization
	);

	const { title, activity, level, score, status, proof } = adminOrganization;

	const [inputs, setInputs] = useState({
		title,
		activity,
		level,
		score,
		status,
		proof,
	});
	const [data, setData] = useState([]);

	useEffect(() => {
		getAdminOneOrganization(params.id);
		getOrganizationActivities();
		getOrganizationLevels();
		index = activityMatch.lastIndexOf(activity);
		setData(organizationLevels[index].level);
	}, []);

	const activityOptions = organizationActivities.map((item) => item.activity);
	const activityMatch = organizationLevels.map((item) => item.activity);
	let index;

	const handleChange = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});

		if (e.target.name == "activity") {
			index = activityMatch.lastIndexOf(e.target.value);
			setData(organizationLevels[index].level);
		}
	};

	const levelOptions = data.map((item) => item.name);

	const handleSubmit = (e) => {
		e.preventDefault();
		inputs.id = params.id;
		updateAdminOrganization(inputs);
		navigate("/admin");
	};
	return (
		<div className="mt-5 p-10 card bg-base-200">
			<form className="form-control" onSubmit={handleSubmit}>
				<h1 className="text-center font-extrabold">Formulir Tinjauan</h1>
				<div className="flex flex-col lg:flex-row justify-between">
					<div className="flex flex-col">
						<InputLabel label="Title" value={title} />

						<label className="label mt-2 font-bold block md:hidden">
							<span className="label-text">Bukti</span>
						</label>
						<img
							className="w-2/4 rounded-lg block md:hidden"
							src={inputs.proof}
							alt=""
						/>

						<FormSelect
							name="activity"
							label="Kategori Pencapaian"
							defaultValue={inputs.activity}
							onChange={handleChange}
							options={activityOptions}
						/>

						<FormSelect
							name="level"
							label="Skala Pencapaian"
							defaultValue={inputs.level}
							onChange={handleChange}
							options={levelOptions}
						/>
						<label className="label mt-2 font-bold">
							<span className="label-text">Status</span>
						</label>
						<select
							name="status"
							className="select w-full"
							defaultValue={inputs.status}
							onChange={handleChange}>
							<option value="Pilih">Pilih</option>
							<option value="Reviewed">Reviewed</option>
							<option value="Rejected">Rejected</option>
							<option value="Approved">Approved</option>
						</select>
						<label className="label mt-2 font-bold">
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

export default AdminOrganizationForm;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../store";
import InputLabel from "../components/InputLabel";
import FormSelect from "../components/FormSelect";

const AdminAcademicForm = ({ source }) => {
	const { title, activity, level, score, status, proof } = source;

	const navigate = useNavigate();
	const params = useParams();
	const academicActivities = useStore((state) => state.academicActivities);
	const academicLevels = useStore((state) => state.academicLevels);
	const getAcademicActivities = useStore(
		(state) => state.getAcademicActivities
	);
	const getAcademicLevels = useStore((state) => state.getAcademicLevels);
	const updateAdminAcademic = useStore((state) => state.updateAdminAcademic);
	const [inputs, setInputs] = useState({
		title,
		activity,
		level,
		score,
		status,
	});
	const [data, setData] = useState([]);

	const activityOptions = academicActivities.map((item) => item.activity);
	const activityMatch = academicLevels.map((item) => item.activity);
	let index;

	useEffect(() => {
		getAcademicActivities();
		getAcademicLevels();
		index = activityMatch.lastIndexOf(inputs.activity);
		setData(academicLevels[index].level);
	}, []);

	const handleChange = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});

		if (e.target.name == "activity") {
			index = activityMatch.lastIndexOf(e.target.value);
			setData(academicLevels[index].level);
		}
	};

	const levelOptions = data.map((item) => item.name);

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

						<label className="label mt-2 font-bold block md:hidden">
							<span className="label-text">Bukti</span>
						</label>
						<img
							className="w-2/4 rounded-lg block md:hidden"
							src={proof}
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
							value={inputs.status}
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

export default AdminAcademicForm;

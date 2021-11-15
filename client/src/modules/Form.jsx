import { DocumentUpload } from "iconsax-react";
import React, { useState, useEffect } from "react";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import Uploader from "../components/Uploader";
import useStore from "../store";

const Form = (props) => {
	const academicActivities = useStore((state) => state.academicActivities);
	const academicLevels = useStore((state) => state.academicLevels);
	const getAcademicActivities = useStore(
		(state) => state.getAcademicActivities
	);
	const getAcademicLevels = useStore((state) => state.getAcademicLevels);

	const academics = useStore((state) => state.academics);
	const addAcademic = useStore((state) => state.addAcademic);

	const [inputs, setInputs] = useState({});
	const [file, setFile] = useState(null);
	const [data, setData] = useState([]);
	const [activities, setActivities] = useState([]);
	const [levels, setLevels] = useState([]);

	useEffect(() => {
		getAcademicActivities();
		getAcademicLevels();
		setActivities(academicActivities);
		setLevels(academicLevels);
	}, []);

	const activityOptions = activities.map((item) => item.activity);
	const activityMatch = levels.map((item) => item.activity);
	let index;

	const handleChange = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});

		if (e.target.name == "activity") {
			index = activityMatch.lastIndexOf(e.target.value);
			setData(levels[index].level);
		}
	};

	const levelOptions = data.map((item) => item.name);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (file) {
			const data = new FormData();
			const r = (Math.random() + 1).toString(36).substring(7);
			const fileName = Date.now() + file.name.replaceAll(" ", "");
			data.append("name", fileName);
			data.append("file", file);
			inputs.proof = fileName;
		}
		addAcademic(inputs);
	};

	const handleServer = (e) => {
		console.log("Submitted");
	};

	return (
		<div className=" mt-5 p-10 card bg-base-200">
			<h1 className="text-center font-extrabold">
				Formulir Pencapaian Akademik
			</h1>
			<form className="form-control" onSubmit={handleSubmit}>
				<FormInput
					name="title"
					label="Pencapaian Akademik"
					placeholder="Akademik"
					onChange={handleChange}
				/>
				<div className="flex flex-col md:flex-row w-auto">
					<FormSelect
						name="activity"
						label="Kategori Pencapaian"
						defaultValue="Pilih"
						onChange={handleChange}
						options={activityOptions}
					/>
					<FormSelect
						name="level"
						label="Skala Pencapaian"
						defaultValue="Pilih"
						onChange={handleChange}
						options={levelOptions}
					/>
				</div>
				<FormInput
					name="year"
					label="Tahun"
					placeholder="2045"
					onChange={handleChange}
				/>
				<label className="label mt-2">
					<span className="label-text">Upload Bukti Pencapaian</span>
				</label>
				{/* <Uploader
					name="file"
					file={file}
					formData={data}
					handleServer={handleServer}
					onUpdateFiles={setFile}
				/> */}
				<label className="w-64 flex flex-col items-center px-4 py-6 bg-accent-content text-primary rounded-lg  tracking-wide uppercase border cursor-pointer">
					<DocumentUpload
						size="32"
						color="#70abc7"
						className="text-secondary"
					/>
					<span className="mt-2 text-base leading-normal">Select a file</span>
					<input
						type="file"
						id="file"
						className="hidden"
						onChange={(e) => setFile(e.target.files[0])}
					/>
				</label>
				<button className="btn btn-primary mt-4">Simpan</button>
			</form>
		</div>
	);
};

export default Form;

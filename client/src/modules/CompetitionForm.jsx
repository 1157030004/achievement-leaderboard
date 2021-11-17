import { DocumentUpload } from "iconsax-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import useStore from "../store";
import storage from "../utils/firebase";

const CompetitionForm = (props) => {
	const navigate = useNavigate();
	const competitionActivities = useStore(
		(state) => state.competitionActivities
	);
	const competitionLevels = useStore((state) => state.competitionLevels);
	const getCompetitionActivities = useStore(
		(state) => state.getCompetitionActivities
	);
	const getCompetitionLevels = useStore((state) => state.getCompetitionLevels);
	const addCompetition = useStore((state) => state.addCompetition);

	const [inputs, setInputs] = useState({});
	const [file, setFile] = useState(null);
	const [activities, setActivities] = useState([]);
	const [levels, setLevels] = useState([]);
	const [data, setData] = useState([]);
	const [uploaded, setUploaded] = useState(0);
	const [percentage, setPercentage] = useState(0);

	useEffect(() => {
		getCompetitionActivities();
		getCompetitionLevels();
		setActivities(competitionActivities);
		setLevels(competitionLevels);
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

	const upload = (items) => {
		items.forEach((item) => {
			const fileName = new Date().getTime() + item.label + item.file.name;
			const uploadTask = storage.ref(`/proof/${fileName}`).put(item.file);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setPercentage(progress);
					console.log("Upload is" + progress + "% done");
				},
				(err) => {
					console.log(err);
				},
				() => {
					uploadTask.snapshot.ref.getDownloadURL().then((url) => {
						setInputs({
							...inputs,
							[item.label]: url,
						});
						setUploaded((prev) => prev + 1);
					});
				}
			);
		});
	};

	const handleUpload = (e) => {
		e.preventDefault();
		upload([{ file: file, label: "proof" }]);
		console.log(inputs);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addCompetition(inputs);
		navigate("/achievements");
	};

	return (
		<div className=" mt-5 p-10 card bg-base-200">
			<h1 className="text-center font-extrabold">
				Formulir Pencapaian Kompetisi
			</h1>
			<form className="form-control" onSubmit={handleSubmit}>
				<FormInput
					name="title"
					label="Pencapaian Kompetisi"
					placeholder="Kompetisi"
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
				{/* <label className="w-64 flex flex-col items-center px-4 py-6 bg-accent-content text-primary rounded-lg  tracking-wide uppercase border cursor-pointer"> */}

				<div className="">
					<input
						type="file"
						id="file"
						className="input input-ghost cursor-pointer pt-1"
						onChange={(e) => setFile(e.target.files[0])}
					/>
				</div>
				{uploaded > 0 ? (
					<button className="btn btn-primary mt-4">Submit</button>
				) : (
					<button className="btn btn-secondary mt-4" onClick={handleUpload}>
						Upload Bukti
					</button>
				)}
			</form>
		</div>
	);
};

export default CompetitionForm;

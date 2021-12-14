import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import FormDate from "../components/FormDate";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import { useStore } from "../store";
import storage from "../utils/firebase";

const CompetitionForm = (props) => {
	const { source } = props;

	const navigate = useNavigate();
	const path = window.location.pathname
	const competitionActivities = useStore(
		(state) => state.competitionActivities
	);
	const competitionLevels = useStore((state) => state.competitionLevels);
	const getCompetitionActivities = useStore(
		(state) => state.getCompetitionActivities
	);
	const getCompetitionLevels = useStore((state) => state.getCompetitionLevels);
	const addCompetition = useStore((state) => state.addCompetition);
	const updateCompetition = useStore((state) => state.updateCompetition);

	const [inputs, setInputs] = useState({});
	const [file, setFile] = useState(null);
	const [data, setData] = useState([]);
	const [uploaded, setUploaded] = useState(0);
	const [percentage, setPercentage] = useState(0);

	useEffect(() => {
		getCompetitionActivities();
		getCompetitionLevels();
	}, []);

	const activityOptions = competitionActivities.map((item) => item.activity);
	const activityMatch = competitionLevels.map((item) => item.activity);
	let index;

	const handleChange = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});

		if (e.target.name === "activity") {
			index = activityMatch.lastIndexOf(e.target.value);
			setData(competitionLevels[index].level);
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
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (path === "/achievements/new") {
			addCompetition(inputs, () => navigate("/welldone"));
		} else {
			inputs.id = source._id;
			updateCompetition(inputs, () => navigate("/welldone"));
		}
	};

	return (
		<div className=" mt-5 p-10 card bg-base-200">
			<h1 className="text-center font-extrabold">Formulir Pencapaian</h1>
			<form className="form-control" onSubmit={handleSubmit}>
				<FormInput
					type="text"
					name="title"
					label="Pencapaian"
					defaultValue={source.title}
					placeholder="Pencapaian"
					onChange={handleChange}
				/>
				<div className="flex flex-col md:flex-row w-auto">
					<FormSelect
						name="activity"
						label="Kategori Pencapaian"
						defaultValue={source.activity}
						onChange={handleChange}
						options={activityOptions}
					/>
					<FormSelect
						name="level"
						label="Skala Pencapaian"
						defaultValue={source.level}
						onChange={handleChange}
						options={levelOptions}
					/>
				</div>
				<FormDate
					type="date"
					name="year"
					label="Tanggal"
					placeholder="tanggal"
					defaultValue={source.year}
					onChange={handleChange}
				/>
				<label className="label mt-2">
					<span className="label-text">Upload Bukti Pencapaian</span>
				</label>
				<ul className="ml-5 text-2xs font-extralight">
					<li>*Cukup upload 1 gambar</li>
					<li>*Ukuran file maksimal 10MB</li>
					<li>*Ektensi jpg, png, jpeg</li>
				</ul>
				<div className="">
					<input
						type="file"
						id="file"
						className="input input-ghost cursor-pointer pt-1"
						onChange={(e) => setFile(e.target.files[0])}
					/>
				</div>

				{uploaded > 0 ? (
					<button className="btn btn-primary mt-4 capitalize">Submit</button>
				) : file ? (
					<button
						className="btn btn-secondary mt-4 capitalize"
						onClick={handleUpload}>
						Upload Bukti
					</button>
				) : (
					<button
						className="btn btn-disabled mt-4 capitalize"
						onClick={handleUpload}>
						Upload Bukti
					</button>
				)}
			</form>
		</div>
	);
};

export default CompetitionForm;

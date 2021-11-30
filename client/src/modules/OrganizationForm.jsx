import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import { useStore } from "../store";
import storage from "../utils/firebase";

const OrganizationForm = ({ source }) => {
	const navigate = useNavigate();
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
	const addOrganization = useStore((state) => state.addOrganization);
	const updateOrganization = useStore((state) => state.updateOrganization);

	const [inputs, setInputs] = useState({});
	const [file, setFile] = useState(null);
	const [data, setData] = useState([]);
	const [uploaded, setUploaded] = useState(0);
	const [percentage, setPercentage] = useState(0);

	useEffect(() => {
		getOrganizationActivities();
		getOrganizationLevels();
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
		if (!source) {
			addOrganization(inputs);
		} else {
			inputs.id = source._id;
			// inputs.proof = source.proof;
			updateOrganization(inputs);
		}
		navigate("/welldone");
	};

	return (
		<div className=" mt-5 p-10 card bg-base-200">
			<h1 className="text-center font-extrabold">Formulir Pencapaian</h1>
			<form className="form-control" onSubmit={handleSubmit}>
				<FormInput
					type="text"
					name="title"
					label="Pencapaian"
					placeholder={"Pencapaian"}
					onChange={handleChange}
				/>
				<div className="flex flex-col md:flex-row w-auto">
					<FormSelect
						name="activity"
						label="Kategori Pencapaian"
						defaultValue={"Pilih"}
						onChange={handleChange}
						options={activityOptions}
					/>
					<FormSelect
						name="level"
						label="Skala Pencapaian"
						defaultValue={"Pilih"}
						onChange={handleChange}
						options={levelOptions}
					/>
				</div>
				<FormInput
					type="number"
					name="year"
					label="Tahun"
					placeholder={"Tahun"}
					onChange={handleChange}
				/>
				<>
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
				</>

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

export default OrganizationForm;

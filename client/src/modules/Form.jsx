import { DocumentUpload } from "iconsax-react";
import React, { useState } from "react";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import Uploader from "../components/Uploader";
import useStore from "../store";

const Form = (props) => {
	const academics = useStore((state) => state.academics);
	const addAcademic = useStore((state) => state.addAcademic);
	const [inputs, setInputs] = useState({});
	const [file, setFile] = useState(null);
	const [data, setData] = useState(null);

	const handleChange = (e) => {
		setInputs((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

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
						options={[
							"Menulis Jurnal",
							"Keilmuan",
							"Penghargaan Akademik",
							"Conference",
							"Mahasiswa Berprestasi",
							"IPK",
						]}
					/>
					<FormSelect
						name="level"
						label="Skala Pencapaian"
						defaultValue="Pilih"
						onChange={handleChange}
						options={["Regional", "Nasional", "Internasional"]}
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

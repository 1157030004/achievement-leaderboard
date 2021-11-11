import React, { useState } from "react";
import { useNavigate } from "react-router";

const FormCategory = () => {
	const navigate = useNavigate();
	const [category, setCategory] = useState("");

	const data = [
		{
			name: "Academic",
			content: "Academic content",
		},
		{
			name: "Competition",
			content: "Competition content",
		},
		{
			name: "Organization",
			content: "Organization content",
		},
	];

	const handleClick = (e) => {
		setCategory(e);
		navigate("/achievements/new", { state: { category } });
	};
	return (
		<div className="container ">
			<h1 className="font-extrabold">Pilih Kategori Pencapaian</h1>
			<div className="body flex justify-center">
				{data.map((item, index) => (
					<div className="item m-1" key={index}>
						<div className="card">
							<div className="card-body">
								<h5 className="card-title text-sm font-bold">{item.name}</h5>
								<p className="card-text text-2xs">{item.content}</p>
								<button
									className="btn btn-xs btn-primary capitalize mt-3"
									onClick={() => handleClick(item.name)}>
									Pilih
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default FormCategory;

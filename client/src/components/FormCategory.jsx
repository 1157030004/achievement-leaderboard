import React from "react";
import { useNavigate } from "react-router";
import { useStore } from "../store";

const FormCategory = () => {
	const navigate = useNavigate();
	const addCategory = useStore((state) => state.addCategory);

	const data = [
		{
			name: "academic",
			content: "Academic content",
		},
		{
			name: "competition",
			content: "Competition content",
		},
		{
			name: "organization",
			content: "Organization content",
		},
	];

	const handleClick = (e) => {
		navigate("/achievements/new");
		addCategory(e);
	};
	return (
		<div className="container ">
			<h1 className="font-extrabold">Pilih Kategori Pencapaian</h1>
			<div className="body flex justify-center">
				{data.map((item, index) => (
					<div className="item m-1" key={index}>
						<div className="card">
							<div className="card-body text-center">
								<h5 className="card-title text-sm font-bold capitalize">
									{item.name}
								</h5>
								<button
									className="btn btn-xs btn-primary rounded-lg capitalize"
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

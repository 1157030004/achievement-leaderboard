import React from "react";

const InputLabel = ({ label, value, image }) => {
	return (
		<div className="flex flex-col">
			<label className="mt-2 font-bold text-xs">{label}</label>
			<span className="text-2xs">{value}</span>
			{image && (
				<div className="card-zoom">
					<img src={image} className="card-zoom-image"></img>
				</div>
			)}
		</div>
	);
};

export default InputLabel;

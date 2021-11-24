import React from "react";

const InputLabel = ({ label, value }) => {
	return (
		<>
			<label className="label mt-2 font-bold">
				<span className="label-text">{label}</span>
			</label>
			<span>{value}</span>
		</>
	);
};

export default InputLabel;

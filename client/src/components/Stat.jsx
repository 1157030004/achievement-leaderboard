import React from "react";

const Stat = ({ handleChange }) => {
	return (
		<div className="tabs">
			<a
				className="tab tab-lifted tab-active"
				onClick={handleChange}
				name="academic">
				Akademik
			</a>
			<a className="tab tab-lifted" onClick={handleChange} name="competition">
				Kompetisi
			</a>
			<a className="tab tab-lifted" onClick={handleChange} name="organization">
				Organisasi
			</a>
		</div>
	);
};

export default Stat;

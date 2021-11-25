import React, { useState } from "react";

const FormInput = ({ type, name, value, label, placeholder, onChange }) => {
	return (
		<>
			<label className="label mt-2">
				<span className="label-text">{label}</span>
			</label>
			<input
				type={type}
				name={name}
				value={value}
				placeholder={placeholder}
				className="input"
				onChange={onChange}
			/>
		</>
	);
};

export default FormInput;

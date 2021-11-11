import React, { useState } from "react";

const FormSelect = ({ name, defaultValue, label, onChange, options }) => {
	return (
		<div className="flex flex-col w-full mt-2 mx-1 md:mx-0 justify-between">
			<label className="label text-left">
				<span className="label-text">{label}</span>
			</label>
			<select
				name={name}
				className="select  w-full max-w-xs"
				// value={defaultValue}
				onChange={onChange}>
				<option value="Pilih">Pilih</option>
				{options.map((option, index) => {
					return (
						<option key={index} value={option}>
							{option}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default FormSelect;

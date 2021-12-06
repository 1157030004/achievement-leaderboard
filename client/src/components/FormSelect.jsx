import React, { useState } from "react";

const FormSelect = ({
	name,
	defaultValue,
	label,
	onChange,
	options,
	disabled,
	onClick,
}) => {
	return (
		<div className="flex flex-col w-full justify-between">
			<div className="flex flex-row items-end">
				<label className="mt-2 font-bold text-xs">{label}</label>
				{onClick && (
					<input
						type="checkbox"
						name={name}
						onClick={onClick}
						className="checkbox checkbox-xs checkbox-secondary mb-2"
					/>
				)}
			</div>

			<select
				name={name}
				className="select w-3/4 lg:w-full max-w-xs"
				value={defaultValue}
				onChange={onChange}
				disabled={disabled}>
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

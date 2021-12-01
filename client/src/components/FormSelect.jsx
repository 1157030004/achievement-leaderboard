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
			<label className="mt-2 font-bold text-xs">{label}</label>
			<div className="flex  items-center">
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
				<input
					type="checkbox"
					name={name}
					onClick={onClick}
					className="checkbox checkbox-xs checkbox-secondary ml-2"
				/>
			</div>
		</div>
	);
};

export default FormSelect;

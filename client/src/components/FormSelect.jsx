import React, { useState } from "react";

const FormSelect = ({
	name,
	defaultValue,
	label,
	options,
	onChange,
	disabled,
	onClick,
}) => {
	return (
		<div className="flex flex-col w-full">
			<label className="mt-2 font-bold text-xs">{label}</label>
			<div className="flex items-end">
				<div className="">
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
					className="select w-full "
					defaultValue={defaultValue}
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
		</div>
	);
};

export default FormSelect;

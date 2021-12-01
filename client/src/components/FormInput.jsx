import React, { useState } from "react";

const FormInput = (props) => {
	const { name, key, label, type, value, disabled, onChange, onClick } = props;
	return (
		<div className="w-full">
			<span className="mt-2 font-bold text-xs" htmlFor="input-field">
				{label}
			</span>
			<div className="flex items-center">
				<input
					className="input w-full"
					key={key}
					labal={label}
					name={name}
					type={type}
					placeholder={label}
					disabled={disabled}
					onChange={onChange}
				/>
				{onClick && (
					<input
						className="checkbox checkbox-xs checkbox-secondary ml-2"
						type="checkbox"
						name={name}
						onClick={onClick}
					/>
				)}
			</div>
		</div>
	);
};

export default FormInput;

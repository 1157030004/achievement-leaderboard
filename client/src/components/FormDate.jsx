import React from "react";

const FormDate = (props) => {
	const { name, key, label, type, value, disabled, onChange, onClick } = props;
	return (
		<div className="w-full">
			<span className="mt-2 font-bold text-xs" htmlFor="input-field">
				{label}
			</span>
			<div className="flex items-center">
				<div className="">
					{onClick && (
						<input
							className="checkbox checkbox-xs checkbox-secondary"
							type="checkbox"
							name={name}
							onClick={onClick}
						/>
					)}
				</div>
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
			</div>
		</div>
	);
};

export default FormDate;

import React, { useState } from "react";

const FormInput = (props) => {
	const { label, errorMessage, onChange, id, ...itemProps } = props;
	return (
		<>
			<span className="label label-text" htmlFor="input-field">
				{label}
			</span>
			<input {...itemProps} className="input" onChange={onChange} />
		</>
	);
};

export default FormInput;

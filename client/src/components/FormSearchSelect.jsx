import React from "react";
import Select from "react-select";

const FormSearchSelect = (props) => {
	const { id, label, options, errorMessage, onChange } = props;

	let campuses = [];

	for (let i = 0; i < options.length; i++) {
		campuses.push({
			value: options[i].name,
			label: options[i].name,
		});
	}

	const customStyles = {
		menu: (provided, state) => ({
			...provided,
		}),

		control: (_, { selectProps: { width } }) => ({
			display: "flex",
			width: "100%",
			height: "50px",
			borderRadius: 99,
			backgroundColor: "#faf7f5",
			paddingTop: "0.2rem",
			paddingLeft: "5px",
		}),

		singleValue: (provided, state) => {
			const opacity = state.isDisabled ? 0.5 : 1;
			const transition = "opacity 300ms";

			return { ...provided, opacity, transition };
		},
	};
	return (
		<>
			<label className="label mt-2">
				<span className="label-text">Perguruan Tinggi</span>
			</label>
			<Select
				className=" w-full h-12 rounded-full p-0"
				styles={customStyles}
				options={campuses}
				onChange={onChange}
			/>
		</>
	);
};

export default FormSearchSelect;

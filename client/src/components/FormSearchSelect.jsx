import React from "react";
import Select from "react-select";

const FormSearchSelect = (props) => {
	const { label, errorMessage, onChange, id, ...itemProps } = props;
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
				{...itemProps}
				className=" w-full h-12 rounded-full p-0"
				styles={customStyles}
				onChange={onChange}
			/>
		</>
	);
};

export default FormSearchSelect;

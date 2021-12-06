import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import FormInput from "../components/FormInput";
import FormSearchSelect from "../components/FormSearchSelect";
import Loading from "../components/Loading";
import { useStore, useAuthStore } from "../store";

const AuthForm = ({ data }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const login = useAuthStore((state) => state.login);
	const register = useAuthStore((state) => state.register);
	const [selected, setSelected] = useState(null);
	const [inputs, setInputs] = useState({});

	const handleChange = (e) => {
		setInputs((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (location.pathname === "/login") {
			login(inputs);
		} else {
			inputs.campus = selected.label;
			register(inputs, () => navigate("/login"));
		}
		console.log(inputs);
	};

	return (
		<>
			<div className=" mt-5 p-10 card bg-base-200">
				<h1 className="text-center font-extrabold">{data.title}</h1>
				<form className="form-control" onSubmit={handleSubmit}>
					{data.map((item) => (
						<>
							{item.type != "select" && (
								<FormInput
									name={item.name}
									key={item.id}
									label={item.label}
									type={item.type}
									value={inputs[item.name]}
									onChange={handleChange}
								/>
							)}

							{item.type === "select" && (
								<FormSearchSelect
									key={item.id}
									{...item}
									options={item.options}
									value={selected}
									onChange={setSelected}
								/>
							)}
						</>
					))}
					<button className="btn btn-primary mt-4 capitalize">Submit</button>
				</form>
			</div>
		</>
	);
};

export default AuthForm;

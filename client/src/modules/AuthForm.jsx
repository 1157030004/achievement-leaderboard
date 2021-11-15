import React, { useState } from "react";
import FormInput from "../components/FormInput";
import FormSearchSelect from "../components/FormSearchSelect";
import useStore from "../store";

const AuthForm = ({ data }) => {
	const login = useStore((state) => state.login);
	const register = useStore((state) => state.register);
	const [selected, setSelected] = useState(null);
	const [inputs, setInputs] = useState({});

	const handleChange = (e) => {
		setInputs((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (data.type === "login") {
			login(inputs);
		} else {
			inputs.campus = selected.label;
			register(inputs);
		}
	};
	return (
		<>
			<div className=" mt-5 p-10 card bg-base-200">
				<h1 className="text-center font-extrabold">{data.title}</h1>
				<form className="form-control" onSubmit={handleSubmit}>
					{data.type === "login" ? (
						<>
							<FormInput
								name="email"
								label="Email"
								placeholder="email@email.com"
								onChange={handleChange}
							/>

							<FormInput
								name="password"
								label="Password"
								placeholder="********"
								onChange={handleChange}
							/>
							<button className="btn btn-primary mt-4">Login</button>
						</>
					) : (
						<>
							<FormInput
								name="email"
								label="Email"
								placeholder="email@email.com"
								onChange={handleChange}
							/>
							<FormInput
								name="name"
								label="Nama Lengkap"
								placeholder="Shadee Arqhifa"
								onChange={handleChange}
							/>
							<FormSearchSelect
								value={selected}
								handleChange={setSelected}
								options={data.options}
							/>
							<FormInput
								name="gpa"
								label="IPK"
								placeholder="3.00"
								onChange={handleChange}
							/>
							<FormInput
								name="password"
								label="Kata Sandi"
								placeholder="Bukan 1234, tanggal lahir, dan nama ortu kan?"
								onChange={handleChange}
							/>
							<button className="btn btn-primary mt-4">Register</button>
						</>
					)}
				</form>
			</div>
		</>
	);
};

export default AuthForm;
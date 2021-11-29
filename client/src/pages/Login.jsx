import React from "react";
import AuthForm from "../modules/AuthForm";

const Login = () => {
	const data = [
		{
			id: 1,
			name: "email",
			type: "text",
			placeholder: "email@email.com",
			errorMessage: "Please enter a valid email address",
			label: "Email",
			required: true,
		},
		{
			id: 2,
			name: "password",
			type: "password",
			placeholder: "password",
			errorMessage: "Please enter a strong password",
			label: "Password",
			required: true,
		},
	];
	return (
		<>
			<AuthForm data={data} />
		</>
	);
};

export default Login;

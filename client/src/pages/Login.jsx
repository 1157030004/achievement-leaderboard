import React from "react";
import AuthForm from "../modules/AuthForm";

const Login = () => {
	const data = {
		type: "login",
		title: "Halaman Login",
		emailLabel: {
			label: "Email",
			name: "email",
			placeholder: "email@email.com",
		},
		passwordLabel: {
			label: "Password",
			name: "password",
			placeholder: "password",
		},
		buttonLabel: "Login",
	};
	return (
		<>
			<AuthForm data={data} />
		</>
	);
};

export default Login;

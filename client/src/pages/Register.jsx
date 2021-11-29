import React from "react";
import AuthForm from "../modules/AuthForm";

const Register = () => {
	const data = [
		{
			id: 1,
			name: "email",
			type: "email",
			placeholder: "email@email.com",
			errorMessage: "Please enter a valid email address",
			label: "Email",
			required: true,
		},
		{
			id: 2,
			name: "name",
			type: "text",
			placeholder: "Sha Dee",
			errorMessage: "Please enter your name",
			label: "Name",
			required: true,
		},
		{
			id: 3,
			name: "campus",
			type: "select",
			placeholder: "Campus",
			errorMessage: "Please enter your campus",
			label: "Campus",
			options: [
				{
					value: "1",
					label: "Institut Teknologi Bandung",
				},
				{
					value: "2",
					label: "Institut Teknologi Sepuluh Nopember",
				},
				{
					value: "3",
					label: "Universitas Pendidikan Indonesia",
				},
			],
			required: true,
		},
		{
			id: 4,
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

export default Register;

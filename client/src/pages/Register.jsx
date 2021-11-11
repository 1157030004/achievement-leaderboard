import React from "react";
import AuthForm from "../modules/AuthForm";

const Register = () => {
	const data = {
		type: "register",
		title: "Halaman Registrasi",
		emailLabel: {
			label: "Email",
			name: "email",
			placeholder: "email@email.com",
		},
		nameLabel: {
			label: "Nama Lengkap",
			name: "name",
			placeholder: "Shadee Arqhifa",
		},
		campusLabel: {
			label: "Perguruan Tinggi",
			name: "campus",
		},
		gpaLabel: {
			label: "IPK",
			name: "gpa",
			placeholder: "3.00",
		},
		passwordLabel: {
			label: "Password",
			name: "password",
			placeholder: "password",
		},
		buttonLabel: "Daftar",
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
	};
	return (
		<>
			<AuthForm data={data} />
		</>
	);
};

export default Register;

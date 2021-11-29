import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import sent from "../assets/sent.png";
import Loading from "../components/Loading";

const Welldone = () => {
	const state = useStore((state) => state);
	const navigate = useNavigate();

	const handleClick = (e) => {
		e.preventDefault();
		if (e.target.name === "achievements") {
			navigate(`/achievements`);
		} else {
			navigate(`/`);
		}
	};

	if (state.isLoading) {
		return <Loading />;
	}
	return (
		<div className="flex flex-col justify-center items-center text-center">
			<img src={sent} alt="grow" className="w-full md:w-1/2" />
			<h1 className="text-3xl font-bold">Selamat!</h1>
			<h1 className="text-3xl font-bold">Prestasimu telah diperbaharui</h1>
			<p className="font-thin text-sm">
				Skor prestasimu akan muncul jika lolos proses review
			</p>
			<div className="flex flex-row  w-full mt-5 justify-evenly">
				<button
					name="achievements"
					className="btn btn-primary rounded-lg"
					onClick={handleClick}>
					Isi lagi
				</button>
				<button
					name="home"
					className="btn btn-primary rounded-lg"
					onClick={handleClick}>
					Kembali
				</button>
			</div>
		</div>
	);
};

export default Welldone;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import grow from "../assets/grow.svg";

const Welldone = () => {
	const preview = useStore((state) => state.preview);
	const navigate = useNavigate();

	const handleClick = (e) => {
		e.preventDefault();
		if (e.target.name === "achievements") {
			navigate(`/achievements`);
		} else {
			navigate(`/`);
		}
	};
	return (
		<div className="flex flex-col justify-center items-center">
			,<img src={grow} alt="grow" className="w-full md:w-10/12" />
			<h1 className="text-3xl">Selamat!</h1>
			<h1>Kamu berhasil menambahkan pencapaian baru</h1>
			<p className="font-thin text-sm">
				Skor pencapaianmu akan muncul jika lolos proses review
			</p>
			<div className="flex flex-row  w-full mt-5 justify-evenly">
				<button
					name="achievements"
					className="btn btn-primary"
					onClick={handleClick}>
					Isi lagi
				</button>
				<button name="home" className="btn btn-primary" onClick={handleClick}>
					Kembali
				</button>
			</div>
		</div>
	);
};

export default Welldone;

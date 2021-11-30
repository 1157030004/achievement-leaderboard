import React from "react";
import empty from "../assets/empty.png";

const NoAchievement = () => {
	return (
		<div className="w-full mt-4">
			<div className="flex flex-col items-center justify-cente text-center">
				<img
					className="w-3/4 md:w-1/2"
					src={empty}
					alt="https://icons8.com/illustrations/author/5dd5075701d03600114d621f"
				/>
				<h1 className="text-xl md:text-3xl font-bold">
					Galeri prestasimu masih kosong
				</h1>
				<h2 className="text-sm md:text-xl font-normal">
					Tekan tombol di kanan atas untuk menambahkan prestasi
				</h2>
			</div>
		</div>
	);
};

export default NoAchievement;

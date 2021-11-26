import React from "react";
import loading from "../assets/loading.png";

const Loading = () => {
	return (
		<div className="w-full mt-4">
			<div className="flex flex-col items-center justify-cente text-center">
				<img
					className="w-3/4 md:w-1/2"
					src={loading}
					alt="https://icons8.com/illustrations/author/5dd5075701d03600114d621f"
				/>
				<h1 className="text-xl md:text-3xl font-bold">Sedang memuat...</h1>
			</div>
		</div>
	);
};

export default Loading;

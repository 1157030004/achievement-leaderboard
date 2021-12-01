import React, { useEffect } from "react";
import Leaderboard from "../modules/Leaderboard";
import { useStore } from "../store";

const Home = () => {
	// const getRank = useStore((state) => state.getRank);

	// useEffect(() => {
	// 	getRank();
	// }, []);

	return (
		<div className="home">
			leaderboard
			{/* <Leaderboard /> */}
		</div>
	);
};

export default Home;

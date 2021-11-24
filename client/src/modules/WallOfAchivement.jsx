import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const WallOfAchivement = ({ source, tab }) => {
	return (
		<div className="w-auto flex flex-wrap ">
			{source.length >= 0 ? (
				source.map((item) => (
					<Card
						key={item._id}
						id={item._id}
						title={item.title}
						activity={item.activity}
						level={item.level}
						score={item.score}
						status={item.status}
						proof={item.proof}
						tab={tab}
					/>
				))
			) : (
				<div>fethcing...</div>
			)}
		</div>
	);
};

export default WallOfAchivement;

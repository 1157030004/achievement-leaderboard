import React, { useState, useEffect } from "react";

const Stat = ({ handleChange, tab }) => {
	const [isActive1, setIsActive1] = useState(false);
	const [isActive2, setIsActive2] = useState(false);
	const [isActive3, setIsActive3] = useState(false);

	const style = {
		a: ({ isActive1, isActive2, isActive3 }) =>
			[
				"tab",
				"tab-lifted",
				isActive1 ? "tab-active" : "",
				isActive2 ? "tab-active" : "",
				isActive3 ? "tab-active" : "",
			].join(" "),
	};

	useEffect(() => {
		if (tab === "academic") {
			setIsActive1(true);
			setIsActive2(false);
			setIsActive3(false);
		}
		if (tab === "competition") {
			setIsActive2(true);
			setIsActive1(false);
			setIsActive3(false);
		}
		if (tab === "organization") {
			setIsActive3(true);
			setIsActive1(false);
			setIsActive2(false);
		}
	}, [tab]);

	return (
		<div className="tabs">
			<a
				className={style.a({ isActive1 })}
				onClick={handleChange}
				name="academic">
				Akademik
			</a>
			<a
				className={style.a({ isActive2 })}
				onClick={handleChange}
				name="competition">
				Kompetisi
			</a>
			<a
				className={style.a({ isActive3 })}
				onClick={handleChange}
				name="organization">
				Organisasi
			</a>
		</div>
	);
};

export default Stat;

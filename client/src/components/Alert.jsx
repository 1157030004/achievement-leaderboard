import React, { useEffect, useState } from "react";

const Alert = ({ status, message }) => {
	const [isOpen, setIsOpen] = useState(true);

	let TIME = (3000 - 500) / 1000 + "s";

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => {
				setIsOpen(false);
			}, 3000);
			return () => {
				clearTimeout();
			};
		}
	}, [isOpen]);
	console.log(TIME);

	const styles = {
		alert: `alert absolute right-10 bottom-10 font-bold transition duration-500 ease-in ${
			status === "success"
				? "alert-success"
				: status === "info"
				? "alert-info"
				: status === "warning"
				? "alert-warning"
				: status === "error"
				? "alert-error"
				: ""
		} ${isOpen ? "block" : "hidden"}`,
	};
	return (
		<div className={styles.alert}>
			<div className="flex justify-between">
				<label>{message}</label>
				<button
					type="button"
					onClick={() => setIsOpen(false)}
					className="btn btn-ghost btn-xs ml-4 lowercase ">
					x
				</button>
			</div>
		</div>
	);
};

export default Alert;

import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store";

const Alert = ({ type, message }) => {
	const setAlert = useAuthStore((state) => state.setAlert);
	const [isOpen, setIsOpen] = useState(true);

	let TIME = (3000 - 500) / 1000 + "s";

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => {
				setIsOpen(false);
				setAlert();
			}, 3000);
			return () => {
				clearTimeout();
			};
		}
	}, [isOpen]);

	const styles = {
		alert: `alert absolute right-10 bottom-10 font-bold transition duration-500 ease-in ${
			type === "success"
				? "alert-success"
				: type === "info"
				? "alert-info"
				: type === "warning"
				? "alert-warning"
				: type === "error"
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

import React from "react";
import { AddSquare } from "iconsax-react";
import FormCategory from "./FormCategory";

const Modal = ({ children }) => {
	return (
		<>
			<label
				htmlFor="my-modal-2"
				className="btn btn-primary btn-sm modal-button rounded-lg">
				<AddSquare size="14" color="white" />
			</label>
			<input type="checkbox" id="my-modal-2" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box">
					<FormCategory />
					<div className="modal-action">
						<label htmlFor="my-modal-2" className="btn btn-xs capitalize">
							Tutup
						</label>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;

import React from "react";
import { AddSquare } from "iconsax-react";
import FormCategory from "./FormCategory";

const Modal = ({ children }) => {
	return (
		<>
			<div className="card m-2 max-w-sm text-center shadow-2xl lg:card-side bg-primary ">
				<div className="card-body items-center justify-center">
					<label for="my-modal-2" className="btn btn-primary modal-button">
						<AddSquare size="24" />
					</label>
					<input type="checkbox" id="my-modal-2" className="modal-toggle" />
					<div className="modal">
						<div className="modal-box">
							<FormCategory />
							<div className="modal-action">
								<label for="my-modal-2" className="btn btn-xs capitalize">
									Tutup
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;

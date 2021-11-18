import React from "react";
import { Trash } from "iconsax-react";

const Popup = ({ handleDelete }) => {
	return (
		<div>
			<label
				htmlFor="my-modal-3"
				className="btn btn-sm btn-ghost  modal-button">
				<Trash size="14" />
			</label>
			<input type="checkbox" id="my-modal-3" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box">
					<span className="text-neutral">
						Kamu yakin ingin menghapus data ini?
					</span>
					<div className="modal-action">
						<label
							htmlFor="my-modal-3"
							className="btn btn-error"
							onClick={handleDelete}>
							Ya
						</label>
						<label htmlFor="my-modal-3" className="btn btn-success">
							Tidak
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Popup;

import React from "react";
import { Trash } from "iconsax-react";

const Popup = ({ handleDelete }) => {
	return (
		<div>
			<label
				htmlFor="my-modal-3"
				className="btn btn-sm btn-accent rounded-lg modal-button ">
				<Trash size="14" color="white" />
			</label>
			<input type="checkbox" id="my-modal-3" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box">
					<span className="text-neutral">
						Kamu yakin ingin menghapus data ini?
					</span>
					<div className="modal-action">
						<label
							name="yes"
							htmlFor="my-modal-3"
							className="btn btn-sm btn-error rounded-lg capitalize"
							onClick={handleDelete}>
							Ya
						</label>
						<label
							name="no"
							htmlFor="my-modal-3"
							className="btn btn-sm btn-accent rounded-lg capitalize">
							Tidak
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Popup;

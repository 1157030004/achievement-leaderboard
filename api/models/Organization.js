const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema(
	{
		title: { type: String, required: true },
		activity: {
			type: String,
			enum: [
				"Kepanitiaan Lokal",
				"Kepanitiaan Universitas",
				"Kepanitiaan Nasional",
				"Organisasi Lokal",
				"Organisasi Universitas",
				"Organisasi Nasional",
			],
			required: true,
		},
		position: {
			type: String,
			enum: ["Ketua Umum", "Ring 1", "Ring 2"],
			required: true,
		},
		year: { type: String, required: true },
		proof: { type: String, default: "" },
		score: {
			type: Number,
			default: 0,
		},
		status: { type: String, enum: ["Pending", "Reviewed"], default: "Pending" },
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Organization", OrganizationSchema);

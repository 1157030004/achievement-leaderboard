const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema(
	{
		title: { type: String, required: true },
		activity: {
			type: String,
			required: true,
		},
		level: {
			type: String,
			required: true,
		},
		year: { type: String, required: true },
		proof: { type: String, default: "" },
		score: {
			type: Number,
			default: 0,
		},
		status: { type: String, default: "Waiting Approval" },
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Organization", OrganizationSchema);

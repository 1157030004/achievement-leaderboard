const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AcademicSchema = new Schema(
	{
		title: { type: String, required: true },
		activity: {
			type: Schema.Types.ObjectId,
			ref: "AcademicActivity",
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

module.exports = mongoose.model("Academic", AcademicSchema);

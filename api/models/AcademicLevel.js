const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AcademicLevel = new Schema(
	{
		activity: {
			type: String,
			required: true,
		},
		level: [
			{
				name: String,
				point: Number,
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("AcademicLevel", AcademicLevel);

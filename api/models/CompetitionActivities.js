const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompetitionActivity = new Schema(
	{
		activity: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("CompetitionActivity", CompetitionActivity);

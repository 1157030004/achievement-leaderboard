const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrganizationActivities = new Schema(
	{
		activity: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model(
	"OrganizationActivities",
	OrganizationActivities
);

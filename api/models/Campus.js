const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampusSchema = new Schema(
	{
		code: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Campus", CampusSchema);

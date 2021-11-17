const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		campus: { type: String, required: true },
		password: { type: String, required: true },
		profilePic: { type: String, default: "" },
		isAdmin: { type: Boolean, default: false },
		gpa: { type: Number, required: true },
		academics: [
			{
				type: Schema.Types.ObjectId,
				ref: "Academic",
			},
		],
		competitions: [
			{
				type: Schema.Types.ObjectId,
				ref: "Competition",
			},
		],
		organizations: [
			{
				type: Schema.Types.ObjectId,
				ref: "Organization",
			},
		],
		academicScore: { type: Number, default: 0 },
		competitionScore: { type: Number, default: 0 },
		organizationScore: { type: Number, default: 0 },
		totalScore: { type: Number, default: 0 },
		rank: { type: Number },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

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
		totalScore: { type: Number, default: 0 },
		gpa: { type: Number, required: true },
		competitions: [
			{
				type: Schema.Types.ObjectId,
				ref: "Competition",
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

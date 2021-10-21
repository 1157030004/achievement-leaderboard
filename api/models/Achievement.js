const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AchievementSchema = new Schema(
	{
		title: { type: String, required: true },
		level: {
			type: String,
			enum: [
				"Lokal",
				"Nasional",
				"Internasional",
				"PKM & PMW",
				"Exchange/Internship/Forum",
			],
			required: true,
			default: "Lokal",
		},
		rank: {
			type: String,
			enum: [
				"Juara 1",
				"Juara 2",
				"Juara 3",
				"Lolos Pendanaan",
				"Medali Emas",
				"Medali Perak",
				"Medali Perunggu",
			],
			required: true,
			default: "Peserta",
		},
		year: { type: String, required: true },
		certificate: { type: String, required: true, default: "" },
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

module.exports = mongoose.model("Achievement", AchievementSchema);

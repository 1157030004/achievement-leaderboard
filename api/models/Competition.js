const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompetitionSchema = new Schema(
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

module.exports = mongoose.model("Competition", CompetitionSchema);

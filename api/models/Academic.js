const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AcademicSchema = new Schema(
	{
		title: { type: String, required: true },
		activity: {
			type: String,
			enum: [
				"Menulis Jurnal",
				"Asisten",
				"Penghargaan Akademik",
				"Konferensi",
				"Mahasiswa Berprestasi",
			],
			required: true,
		},
		level: {
			type: String,
			enum: [
				"Jurusan",
				"Fakultas",
				"Universitas",
				"Nasional",
				"Internasional",
				"Asisten Penelitian/Lab",
				"Asisten Dosen",
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

module.exports = mongoose.model("Academic", AcademicSchema);

const router = require("express").Router();
const verify = require("../verifyToken");
const Competition = require("../models/Competition");
const User = require("../models/User");
const { gpaCount } = require("../calculator");

const upload = require("../middleware/upload");

//!Create
router.post("/", verify, upload.single("proof"), async (req, res) => {
	const { title, level, rank, year, proof } = req.body;
	const user = await User.findById(req.user.id);
	const newCompetition = new Competition({
		title,
		level,
		rank,
		year,
		owner: req.user.id,
	});
	if (req.file) {
		newCompetition.proof = req.file.path;
	}

	try {
		await User.updateOne(
			{ _id: req.user.id },
			{
				$push: { competitions: newCompetition },
			},
			{ new: true }
		);

		const savedCompetition = await newCompetition.save();
		res.status(201).json(savedCompetition);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

//!Update Competition
router.put("/:id", verify, async (req, res) => {
	const { score, status } = req.body;
	if (req.user.isAdmin) {
		try {
			const updateCompetition = await Competition.findByIdAndUpdate(
				req.params.id,
				{
					status,
					score,
				},
				{
					new: true,
				}
			);

			let total = 0;
			const user = await User.findByIdAndUpdate(
				updateCompetition.owner
			).populate("competitions");

			user.competitions.forEach((el) => {
				total += el.score;
			});

			//*Add all score to competitionScore
			if (updateCompetition.score === 0) {
				await User.findByIdAndUpdate(updateCompetition.owner, [
					{
						$set: {
							competitionScore: { $sum: [score, "$competitionScore"] },
							totalScore: { $sum: [score, "$totalScore"] },
						},
					},
				]);
			}

			res.status(200).json(updateCompetition);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You are not allowed");
	}
});

//!Delete
router.delete("/:id", verify, async (req, res) => {
	try {
		await Competition.findByIdAndDelete(req.params.id);
		res.status(200).json("Competition has been deleted");
	} catch (err) {
		res.status(500).json(err);
	}
});

//!Get User Competition
router.get("/:id", verify, async (req, res) => {
	if (req.user.id === req.params.id) {
		try {
			const competition = await Competition.findById(req.params.id);
			if (!competition) return res.status(404).json("Not Found");

			res.status(200).json(competition);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You are not allowed");
	}
});

//!Get All competitions
router.get("/", verify, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			const title = req.query.title;
			const page = parseInt(req.query.page) || 1;
			const pageSize = parseInt(req.query.limit) || 4;
			const skip = (page - 1) * pageSize;
			const total = await User.countDocuments();

			const pages = Math.ceil(total / pageSize);

			let query = Competition.find()
				.skip(skip)
				.sort({ createdAt: -1 })
				.limit(pageSize)
				.populate("owner", "-password -competitions");

			if (page > pages) {
				return res.status(404).json("No page found");
			}

			const result = title ? await Competition.find({ title }) : await query;

			res.status(200).json({
				count: result.length,
				page,
				pages,
				data: result,
			});
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You are not allowed");
	}
});

module.exports = router;

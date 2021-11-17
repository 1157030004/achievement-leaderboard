const router = require("express").Router();
const verify = require("../verifyToken");
const Competition = require("../models/Competition");
const User = require("../models/User");

//!Create
router.post("/", verify, async (req, res) => {
	const { title, activity, level, year, proof } = req.body;
	const user = await User.findById(req.user.id);
	const newCompetition = new Competition({
		title,
		activity,
		level,
		year,
		proof,
		owner: req.user.id,
	});

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

//!Update Competition User
router.put("/:id", verify, async (req, res) => {
	const { title, activity, level, year, proof } = req.body;
	try {
		const competition = await Competition.findById(req.params.id);

		if (competition) {
			const updateCompetition = await Competition.findByIdAndUpdate(
				req.params.id,
				{
					title,
					activity,
					level,
					year,
					proof,
				},
				{
					new: true,
				}
			);

			res.status(200).json(updateCompetition);
		} else {
			return res.status(404).json("Not Found");
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

//!Delete
router.delete("/:id", verify, async (req, res) => {
	try {
		const deletedCompetition = await Competition.findById(req.params.id);

		if (deletedCompetition.owner.toString() !== req.user.id) {
			return res.status(403).json("You are not allowed");
		}

		if (deletedCompetition) {
			let total = 0;
			const user = await User.findById(deletedCompetition.owner).populate(
				"competitions"
			);

			user.competitions.forEach((el) => {
				total += el.score;
			});

			await User.findByIdAndUpdate(
				deletedCompetition.owner,
				[
					{
						$set: {
							competitionScore: {
								$sum: [total, -deletedCompetition.score],
							},
						},
					},
				],
				{ new: true }
			);

			await User.findByIdAndUpdate(
				deletedCompetition.owner,
				[
					{
						$set: {
							totalScore: {
								$sum: [
									"$academicScore",
									"$competitionScore",
									"$organizationScore",
								],
							},
						},
					},
				],
				{ new: true }
			);

			await Competition.findByIdAndDelete(req.params.id);

			res.status(200).json("Competition has been deleted");
		} else {
			return res.status(404).json("Not Found");
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

//!Get User Competition
router.get("/:id", verify, async (req, res) => {
	if (req.user.id === req.params.id) {
		try {
			let competition = [];
			competition = await Competition.find({ owner: req.user.id });
			if (!competition) return res.status(404).json("Not Found");

			res.status(200).json({
				data: competition,
			});
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You are not allowed");
	}
});

module.exports = router;

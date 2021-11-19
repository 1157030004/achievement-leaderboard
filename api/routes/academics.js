const router = require("express").Router();
const verify = require("../verifyToken");
const Academic = require("../models/Academic");
const User = require("../models/User");

//!Create
router.post("/", verify, async (req, res) => {
	const { title, activity, level, year, proof } = req.body;
	const newAcademic = new Academic({
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
				$push: { academics: newAcademic },
			},
			{ new: true }
		);

		const savedAcademic = await newAcademic.save();
		res.status(201).json(savedAcademic);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

//!Update Academic User
router.put("/:id", verify, async (req, res) => {
	const { title, activity, level, year, proof } = req.body;
	try {
		const academic = await Academic.findById(req.params.id);

		if (academic) {
			const updateAcademic = await Academic.findByIdAndUpdate(
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

			res.status(200).json(updateAcademic);
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
		const deletedAcademic = await Academic.findById(req.params.id);

		if (deletedAcademic.owner.toString() !== req.user.id) {
			return res.status(403).json("You are not allowed");
		}

		if (deletedAcademic) {
			let total = 0;
			const user = await User.findById(deletedAcademic.owner).populate(
				"academics"
			);

			user.academics.forEach((el) => {
				total += el.score;
			});

			await User.findByIdAndUpdate(
				deletedAcademic.owner,
				[
					{
						$set: {
							academicScore: {
								$sum: [total, -deletedAcademic.score],
							},
						},
					},
				],
				{ new: true }
			);

			await User.findByIdAndUpdate(
				deletedAcademic.owner,
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

			await Academic.findByIdAndDelete(req.params.id);

			res.status(200).json("Academic has been deleted");
		} else {
			return res.status(404).json("Not Found");
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

//!Get One Academic
router.get("/:id", verify, async (req, res) => {
	try {
		const academic = await Academic.findById(req.params.id);
		if (!academic) return res.status(404).json("Not Found");

		res.status(200).json(academic);
	} catch (err) {
		res.status(500).json(err);
	}
});

//!Get User Academics
router.get("/", verify, async (req, res) => {
	try {
		let academic = [];
		// const academic = await Academic.findById(req.params.id);
		academic = await Academic.find({ owner: req.user.id });
		if (!academic) return res.status(404).json("Not Found");

		res.status(200).json({
			data: academic,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;

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

//!Update Academic
router.put("/admin/:id", verify, async (req, res) => {
	const { score, status } = req.body;
	if (req.user.isAdmin) {
		try {
			const updateAcademic = await Academic.findByIdAndUpdate(
				req.params.id,
				{
					status,
					score,
				},
				{
					new: true,
				}
			);
			if (updateAcademic) {
				let total = 0;
				const user = await User.findById(updateAcademic.owner).populate(
					"academics"
				);

				user.academics.forEach((el) => {
					total += el.score;
				});

				//*Add all score to academicScore
				await User.findByIdAndUpdate(
					updateAcademic.owner,
					[
						{
							$set: {
								academicScore: total,
							},
						},
					],
					{ new: true }
				);

				res.status(200).json(updateAcademic);
			} else {
				return res.status(404).json("Not Found");
			}
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You are not allowed");
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
		const deletedAcademic = await Academic.findByIdAndDelete(req.params.id);
		if (deletedAcademic) {
			let total = 0;
			const user = await User.findById(deletedAcademic.owner).populate(
				"academics"
			);

			user.academics.forEach((el) => {
				total += el.score;
			});

			await User.findByIdAndUpdate(
				{ _id: user._id },
				[
					{
						$set: {
							academicScore: total,
						},
					},
				],
				{ new: true }
			);

			res.status(200).json("Academic has been deleted");
		} else {
			return res.status(404).json("Not Found");
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

//!Get User Academic
router.get("/", verify, async (req, res) => {
	if (req.user.id === req.params.id) {
		try {
			const academic = await Academic.findById(req.params.id);
			if (!academic) return res.status(404).json("Not Found");

			res.status(200).json(academic);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You are not allowed");
	}
});

//!Get All Academics
// router.get("/", verify, async (req, res) => {
// 	if (req.user.isAdmin) {
// 		try {
// 			const title = req.query.title;
// 			const page = parseInt(req.query.page) || 1;
// 			const pageSize = parseInt(req.query.limit) || 4;
// 			const skip = (page - 1) * pageSize;
// 			const total = await User.countDocuments();

// 			const pages = Math.ceil(total / pageSize);

// 			let query = Academic.find()
// 				.skip(skip)
// 				.sort({ createdAt: -1 })
// 				.limit(pageSize)
// 				.populate("owner", "-password -competitions -academics -organizations");

// 			if (page > pages) {
// 				return res.status(404).json("No page found");
// 			}

// 			const result = title ? await Academic.find({ title }) : await query;

// 			res.status(200).json({
// 				count: result.length,
// 				page,
// 				pages,
// 				data: result,
// 			});
// 		} catch (err) {
// 			console.log(err);
// 			res.status(500).json(err);
// 		}
// 	} else {
// 		res.status(403).json("You are not allowed");
// 	}
// });

module.exports = router;

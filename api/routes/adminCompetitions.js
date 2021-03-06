const router = require("express").Router();
const verify = require("../verifyToken");
const Competition = require("../models/Competition");
const User = require("../models/User");

//!Update Competition Admin
router.put("/:id", verify, async (req, res) => {
	const { score, status } = req.body;
	if (req.user.isAdmin) {
		try {
			const updateCompetition = await Competition.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{
					new: true,
				}
			);
			if (updateCompetition) {
				let total = 0;
				const user = await User.findByIdAndUpdate(
					updateCompetition.owner
				).populate("competitions");

				user.competitions.forEach((el) => {
					total += el.score;
				});

				//*Add all score to competitionScore
				await User.findByIdAndUpdate(
					updateCompetition.owner,
					[
						{
							$set: {
								competitionScore: total,
							},
						},
					],
					{ new: true }
				);

				await User.findByIdAndUpdate(
					updateCompetition.owner,
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

				res.status(200).json(updateCompetition);
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

//!Delete
router.delete("/:id", verify, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			const deletedCompetition = await Competition.findByIdAndDelete(
				req.params.id
			);
			if (deletedCompetition) {
				let total = 0;
				const user = await User.findById(deletedCompetition.owner).populate(
					"competitions"
				);

				user.competitions.forEach((el) => {
					total += el.score;
				});

				await User.findByIdAndUpdate(
					{ _id: user._id },
					[
						{
							$set: {
								competitionScore: total,
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
	} else {
		res.status(403).json("You are not allowed");
	}
});

//!Get One Competition
router.get("/:id", verify, async (req, res) => {
	if (req.user.isAdmin) {
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
				.populate("owner", "-password -competitions -academics -organizations");
			// .limit(pageSize);
			// if (page > pages) {
			// 	return res.status(404).json("No page found");
			// }

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

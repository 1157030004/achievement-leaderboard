const router = require("express").Router();
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");
const Achievement = require("../models/Achievement");
const User = require("../models/User");
const { gpaCount } = require("../calculator");

const upload = require("../middleware/upload");

//!Create
router.post("/", verify, upload.single("certificate"), async (req, res) => {
	const { title, level, rank, year, certificate } = req.body;
	const user = await User.findById(req.user.id);
	const newAchievement = new Achievement({
		title,
		level,
		rank,
		year,
		owner: req.user.id,
	});
	if (req.file) {
		newAchievement.certificate = req.file.path;
	}

	try {
		console.log(newAchievement);
		await User.updateOne(
			{ _id: req.user.id },
			{
				$push: { achievements: newAchievement },
			},
			{ new: true }
		);

		const savedAchievement = await newAchievement.save();
		res.status(201).json(savedAchievement);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

//!Update Achievement
router.put("/:id", verify, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			const updateAchievement = await Achievement.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{
					new: true,
				}
			);

			let total = 0;
			const user = await User.findByIdAndUpdate(
				updateAchievement.owner
			).populate("achievements");

			user.achievements.forEach((el) => {
				total += el.score;
			});

			//*
			console.log(gpaCount(3.13));

			//*Add all score to totalScore
			await User.findByIdAndUpdate(updateAchievement.owner, {
				$set: { totalScore: total },
			});

			res.status(200).json(updateAchievement);
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
		await Achievement.findByIdAndDelete(req.params.id);
		res.status(200).json("Achievement has been deleted");
	} catch (err) {
		res.status(500).json(err);
	}
});

//!Get User Achievement
router.get("/:id", verify, async (req, res) => {
	if (req.user.id === req.params.id) {
		try {
			const achievement = await Achievement.findById(req.params.id);
			if (!achievement) return res.status(404).json("Not Found");

			res.status(200).json(achievement);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You are not allowed");
	}
});

//!Get All Achievements
router.get("/", verify, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			const title = req.query.title;
			const page = parseInt(req.query.page) || 1;
			const pageSize = parseInt(req.query.limit) || 4;
			const skip = (page - 1) * pageSize;
			const total = await User.countDocuments();

			const pages = Math.ceil(total / pageSize);

			let query = Achievement.find()
				.skip(skip)
				.sort({ createdAt: -1 })
				.limit(pageSize)
				.populate("owner", "-password -achievements");

			if (page > pages) {
				return res.status(404).json("No page found");
			}

			const result = title ? await Achievement.find({ title }) : await query;

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

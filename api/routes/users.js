const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");
const { gpaCount } = require("../calculator");

const upload = require("../middleware/upload");

//!UPDATE
router.put("/:id", verify, upload.single("profilePic"), async (req, res) => {
	if (req.user.id === req.params.id || req.user.isAdmin) {
		if (req.body.password) {
			req.body.password = CryptoJS.AES.encrypt(
				req.body.password,
				process.env.SECRET_KEY
			).toString();
		}

		try {
			const updatedUser = await User.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{
					new: true,
				}
			);

			if (req.file) {
				updatedUser.profilePic = req.file.path;
			}
			res.status(200).json(updatedUser);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You can update only your account!");
	}
});

//!DELETE
router.delete("/:id", verify, async (req, res) => {
	if (req.user.id === req.params.id || req.user.isAdmin) {
		try {
			const updatedUser = await User.findByIdAndDelete(req.params.id);

			res.status(200).json("User has been deleted");
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You can delete only your account!");
	}
});

//!GET One User
router.get("/find/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { password, ...info } = user._doc;
		res.status(200).json(info);
	} catch (err) {
		res.status(500).json(err);
	}
});

//!GET PUBLIC USER SCORE Rank
router.get("/rank", async (req, res) => {
	try {
		const name = req.query.name;
		const page = parseInt(req.query.page) || 1;
		const pageSize = parseInt(req.query.limit) || 4;
		const skip = (page - 1) * pageSize;
		const total = await User.countDocuments();

		const pages = Math.ceil(total / pageSize);

		let query = await User.find()
			.select("-password")
			.skip(skip)
			.sort({ totalScore: 1 })
			.populate("competitions academics organizations");
		// .limit(pageSize);

		// if (page > pages) {
		// 	return res.status(404).json("No page found");
		// }

		query.sort((a, b) => b.totalScore - a.totalScore);

		for (let i = 0; i < query.length; i++) {
			let totalPoints = query[i].totalScore;
			let userRank = query.filter((r) => r.totalScore === totalPoints);
			for (let r of userRank) {
				r.rank = i + 1;
			}
			i += userRank.length - 1;
		}

		const result = name ? await User.find({ name }) : await query;

		res.status(200).json({
			count: result.length,
			page,
			pages,
			data: result,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ err });
	}
});

//!GET ALL
router.get("/", verify, async (req, res) => {
	const query = req.query.new;
	if (req.user.isAdmin) {
		try {
			const users = query
				? await User.find().sort({ _id: -1 }).limit(10).select("-competitions")
				: await User.find().select("-competitions");

			res.status(200).json(users);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You are not allowed!");
	}
});

//!GET USER STATS
router.get("/stats", async (req, res) => {
	const today = new Date();
	const lastYear = today.setFullYear(today.setFullYear() - 1);

	const monthsArray = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	try {
		const data = await User.aggregate([
			{
				$project: {
					month: { $month: "$createdAt" },
				},
			},
			{
				$group: {
					_id: "$month",
					total: { $sum: 1 },
				},
			},
		]);
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;

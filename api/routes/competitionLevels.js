const router = require("express").Router();
const verify = require("../verifyToken");
const CompetitionLevels = require("../models/CompetitionLevels");

//!Create Competition Level
router.post("/", verify, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			const { activity, level } = req.body;
			const newLevel = new CompetitionLevels({
				activity,
				level,
			});
			const data = await newLevel.save();
			res.status(200).json(data);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You are not allowed");
	}
});

//!Get Competition Level
router.get("/", verify, async (req, res) => {
	try {
		const level = await CompetitionLevels.find();

		if (level) {
			res.status(200).json(level);
		} else {
			res.status(404).json("Not Found");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;

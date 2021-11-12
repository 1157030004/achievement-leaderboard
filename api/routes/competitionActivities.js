const router = require("express").Router();
const verify = require("../verifyToken");
const CompetitionActivities = require("../models/CompetitionActivities");

//!Admin Create Competition Activity
router.post("/", verify, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			const { activity } = req.body;
			const newActivity = new CompetitionActivities({
				activity,
			});
			const data = await newActivity.save();
			res.status(200).json(data);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You are not allowed");
	}
});

//!Get Competition Activity
router.get("/", verify, async (req, res) => {
	try {
		const activity = await CompetitionActivities.find();

		if (activity) {
			const activityLevel = await CompetitionActivities.aggregate([
				{
					$lookup: {
						from: "competitionlevels",
						localField: "activity",
						foreignField: "activity",
						as: "competition_level_doc",
					},
				},
			]);
			res.status(200).json(activityLevel);
		} else {
			res.status(404).json("Not Found");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});
module.exports = router;

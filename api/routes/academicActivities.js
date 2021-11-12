const router = require("express").Router();
const verify = require("../verifyToken");
const Academic = require("../models/Academic");
const AcademicActivity = require("../models/AcademicActivities");
const User = require("../models/User");

//!Admin Create Academic Activity
router.post("/", verify, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			const { activity } = req.body;
			const newActivity = new AcademicActivity({
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

//!Get Academic Activity
router.get("/", verify, async (req, res) => {
	try {
		const activity = await AcademicActivity.find();

		if (activity) {
			const activityLevel = await AcademicActivity.aggregate([
				{
					$lookup: {
						from: "academiclevels",
						localField: "activity",
						foreignField: "activity",
						as: "academic_level_doc",
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

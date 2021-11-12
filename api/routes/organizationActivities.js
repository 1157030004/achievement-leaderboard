const router = require("express").Router();
const verify = require("../verifyToken");
const OrganizationActivities = require("../models/OrganizationActivities");

//!Admin Create Organization Activity
router.post("/", verify, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			const { activity } = req.body;
			const newActivity = new OrganizationActivities({
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

//!Get Organization Activity
router.get("/", verify, async (req, res) => {
	try {
		const activity = await OrganizationActivities.find();

		if (activity) {
			const activityLevel = await OrganizationActivities.aggregate([
				{
					$lookup: {
						from: "organizationlevelsss",
						localField: "activity",
						foreignField: "activity",
						as: "organization_level_doc",
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

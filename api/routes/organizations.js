const router = require("express").Router();
const verify = require("../verifyToken");
const Organization = require("../models/Organization");
const User = require("../models/User");

//!Create
router.post("/", verify, async (req, res) => {
	const { title, activity, level, year, proof } = req.body;
	const newOrganization = new Organization({
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
				$push: { organizations: newOrganization },
			},
			{ new: true }
		);

		const savedOrganization = await newOrganization.save();
		res.status(201).json(savedOrganization);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

//!Update Organization User
router.put("/:id", verify, async (req, res) => {
	const { title, activity, level, year, proof } = req.body;
	try {
		const organization = await Organization.findById(req.params.id);

		if (organization) {
			const updateOrganization = await Organization.findByIdAndUpdate(
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

			res.status(200).json(updateOrganization);
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
		const deletedOrganization = await Organization.findById(req.params.id);

		if (deletedOrganization.owner.toString() !== req.user.id) {
			return res.status(403).json("You are not allowed");
		}

		if (deletedOrganization) {
			let total = 0;
			const user = await User.findById(deletedOrganization.owner).populate(
				"organizations"
			);

			user.organizations.forEach((el) => {
				total += el.score;
			});

			await User.findByIdAndUpdate(
				deletedOrganization.owner,
				[
					{
						$set: {
							organizationScore: {
								$sum: [total, -deletedOrganization.score],
							},
						},
					},
				],
				{ new: true }
			);

			await User.findByIdAndUpdate(
				deletedOrganization.owner,
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

			await Organization.findByIdAndDelete(req.params.id);

			res.status(200).json("Organization has been deleted");
		} else {
			return res.status(404).json("Not Found");
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

//!Get User Organization
router.get("/", verify, async (req, res) => {
	try {
		let organization = [];
		organization = await Organization.find({ owner: req.user.id });
		if (!organization) return res.status(404).json("Not Found");

		res.status(200).json({
			data: organization,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;

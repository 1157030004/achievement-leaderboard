const router = require("express").Router();
const verify = require("../verifyToken");
const Organization = require("../models/Organization");
const User = require("../models/User");

//!Update
router.put("/:id", verify, async (req, res) => {
	const { score, status } = req.body;
	if (req.user.isAdmin) {
		try {
			const updateOrganization = await Organization.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{
					new: true,
				}
			);
			if (updateOrganization) {
				let total = 0;
				const user = await User.findByIdAndUpdate(
					updateOrganization.owner
				).populate("organizations");

				user.organizations.forEach((el) => {
					total += el.score;
				});

				//*Add all score to organizationScore
				await User.findByIdAndUpdate(
					updateOrganization.owner,
					[
						{
							$set: {
								organizationScore: total,
							},
						},
					],
					{ new: true }
				);

				await User.findByIdAndUpdate(
					updateOrganization.owner,
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

				res.status(200).json(updateOrganization);
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
			const deletedOrganization = await Organization.findByIdAndDelete(
				req.params.id
			);
			if (deletedOrganization) {
				let total = 0;
				const user = await User.findById(deletedOrganization.owner).populate(
					"organizations"
				);

				user.organizations.forEach((el) => {
					total += el.score;
				});

				await User.findByIdAndUpdate(
					{ _id: user._id },
					[
						{
							$set: {
								organizationScore: total,
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
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You are not allowed");
	}
});

//!Get One Organization
router.get("/:id", verify, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			const organization = await Organization.findById(req.params.id);
			if (!organization) return res.status(404).json("Not Found");

			res.status(200).json(organization);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You are not allowed");
	}
});

//!Get All Organizations
router.get("/", verify, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			const title = req.query.title;
			const page = parseInt(req.query.page) || 1;
			const pageSize = parseInt(req.query.limit) || 4;
			const skip = (page - 1) * pageSize;
			const total = await User.countDocuments();

			const pages = Math.ceil(total / pageSize);

			let query = Organization.find()
				.skip(skip)
				.sort({ createdAt: -1 })
				.populate("owner", "-password -competitions -academics -organizations");
			// .limit(pageSize)

			// if (page > pages) {
			// 	return res.status(404).json("No page found");
			// }

			const result = title ? await Organization.find({ title }) : await query;

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

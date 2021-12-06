const router = require("express").Router();
const Campus = require("../models/Campus");

router.get("/", async (req, res) => {
	try {
		const campuses = await Campus.find();
		res.status(200).json({
			data: campuses,
		});
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

module.exports = router;

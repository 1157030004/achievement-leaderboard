const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//!Register
router.post("/register", async (req, res) => {
	const { email, name, campus, password } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		const newUser = new User({
			email,
			name,
			campus,
			password: CryptoJS.AES.encrypt(
				password,
				process.env.SECRET_KEY
			).toString(),
		});

		try {
			const user = await newUser.save();
			res.status(201).json(user);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	} else if (user.email == email) {
		return res.status(403).json("Email already exist");
	}
});

//!Login
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		!user && res.status(401).json("Wrong password or email!");

		const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
		const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

		originalPassword !== req.body.password &&
			res.status(401).json("Wrong password or username");

		const token = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			process.env.SECRET_KEY,
			{ expiresIn: "5d" }
		);

		const { password, ...info } = user._doc;
		res.status(200).json({ ...info, token });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;

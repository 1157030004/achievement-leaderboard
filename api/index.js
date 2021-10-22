const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const competitionRoute = require("./routes/competitions");
const academicRoute = require("./routes/academics");
const organizationRoute = require("./routes/organizations");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB connected"))
	.catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/competitions", competitionRoute);
app.use("/api/academics", academicRoute);
app.use("/api/organizations", organizationRoute);

app.listen(8800, () => {
	console.log("Backend server is running!");
});

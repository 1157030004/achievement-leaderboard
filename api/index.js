const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");

const adminAcademicRoute = require("./routes/adminAcademics");
const academicRoute = require("./routes/academics");
const academicActivitiesRoute = require("./routes/academicActivities");
const academicLevelsRoute = require("./routes/academicLevels");

const adminCompetitionRoute = require("./routes/adminCompetitions");
const competitionRoute = require("./routes/competitions");
const competitionActivitiesRoute = require("./routes/competitionActivities");
const competitionLevelsRoute = require("./routes/competitionLevels");

const adminOrganizationRoute = require("./routes/adminOrganizations");
const organizationRoute = require("./routes/organizations");
const organizationActivitiesRoute = require("./routes/organizationActivities");
const organizationLevelsRoute = require("./routes/organizationLevels");

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

// app.use(express.static(path.join(__dirname, "build")));
// app.get("/*", function (req, res) {
// 	res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.use("/api/admin/academics", adminAcademicRoute);
app.use("/api/academics", academicRoute);
app.use("/api/academic-activities", academicActivitiesRoute);
app.use("/api/academic-levels", academicLevelsRoute);

app.use("/api/admin/competitions", adminCompetitionRoute);
app.use("/api/competitions", competitionRoute);
app.use("/api/competition-activities", competitionActivitiesRoute);
app.use("/api/competition-levels", competitionLevelsRoute);

app.use("/api/admin/organizations", adminOrganizationRoute);
app.use("/api/organizations", organizationRoute);
app.use("/api/organization-activities", organizationActivitiesRoute);
app.use("/api/organization-levels", organizationLevelsRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Backend server is running on port ${PORT}!`);
});

import axios from "axios";

const rootLink = process.env.REACT_APP_API_URL;

const instance = axios.create({
	baseURL: rootLink,
});

instance.interceptors.request.use(
	async (config) => {
		const token = await localStorage.getItem("token");
		if (token) {
			config.headers.token = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

const register = `${rootLink}api/auth/register`;
const login = `${rootLink}api/auth/login`;

const rank = `${rootLink}api/users/rank`;

const createAcademic = `${rootLink}api/academics`;
const getAcademics = `${rootLink}api/academics`;
const getOneAcademic = `${rootLink}api/academics`;
const getAcademicActivities = `${rootLink}api/academic-activities`;
const getAcademicLevels = `${rootLink}api/academic-levels`;
const deleteAcademic = `${rootLink}api/academics`;

const createCompetition = `${rootLink}api/competitions`;
const getCompetitions = `${rootLink}api/competitions`;
const getOneCompetition = `${rootLink}api/competitions`;
const getCompetitionActivities = `${rootLink}api/competition-activities`;
const getCompetitionLevels = `${rootLink}api/competition-levels`;

const createOrganization = `${rootLink}api/organizations`;
const getOrganizations = `${rootLink}api/organizations`;
const getOneOrganization = `${rootLink}api/organizations`;
const getOrganizationActivities = `${rootLink}api/organization-activities`;
const getOrganizationLevels = `${rootLink}api/organization-levels`;

export default instance;
export {
	register,
	login,
	rank,
	createAcademic,
	getAcademics,
	getOneAcademic,
	getAcademicActivities,
	getAcademicLevels,
	deleteAcademic,
	createCompetition,
	getCompetitions,
	getOneCompetition,
	getCompetitionActivities,
	getCompetitionLevels,
	createOrganization,
	getOrganizations,
	getOneOrganization,
	getOrganizationActivities,
	getOrganizationLevels,
};

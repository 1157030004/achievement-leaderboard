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
const updateAcademic = `${rootLink}api/academics`;
const deleteAcademic = `${rootLink}api/academics`;

const createCompetition = `${rootLink}api/competitions`;
const getCompetitions = `${rootLink}api/competitions`;
const getOneCompetition = `${rootLink}api/competitions`;
const getCompetitionActivities = `${rootLink}api/competition-activities`;
const getCompetitionLevels = `${rootLink}api/competition-levels`;
const updateCompetition = `${rootLink}api/competitions`;
const deleteCompetition = `${rootLink}api/competitions`;

const createOrganization = `${rootLink}api/organizations`;
const getOrganizations = `${rootLink}api/organizations`;
const getOneOrganization = `${rootLink}api/organizations`;
const getOrganizationActivities = `${rootLink}api/organization-activities`;
const getOrganizationLevels = `${rootLink}api/organization-levels`;
const updateOrganization = `${rootLink}api/organizations`;
const deleteOrganization = `${rootLink}api/organizations`;

const getAdminAllAcademics = `${rootLink}api/admin/academics`;
const getAdminOneAcademic = `${rootLink}api/admin/academics`;
const updateAdminAcademic = `${rootLink}api/admin/academics`;
const deleteAdminAcademic = `${rootLink}api/admin/academics`;

const getAdminAllCompetitions = `${rootLink}api/admin/competitions`;
const getAdminOneCompetition = `${rootLink}api/admin/competitions`;
const updateAdminCompetition = `${rootLink}api/admin/competitions`;
const deleteAdminCompetition = `${rootLink}api/admin/competitions`;

const getAdminAllOrganizations = `${rootLink}api/admin/organizations`;
const getAdminOneOrganization = `${rootLink}api/admin/organizations`;
const updateAdminOrganization = `${rootLink}api/admin/organizations`;
const deleteAdminOrganization = `${rootLink}api/admin/organizations`;

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
	updateAcademic,
	deleteAcademic,
	createCompetition,
	getCompetitions,
	getOneCompetition,
	getCompetitionActivities,
	getCompetitionLevels,
	updateCompetition,
	deleteCompetition,
	createOrganization,
	getOrganizations,
	getOneOrganization,
	getOrganizationActivities,
	getOrganizationLevels,
	updateOrganization,
	deleteOrganization,
	getAdminAllAcademics,
	getAdminOneAcademic,
	updateAdminAcademic,
	deleteAdminAcademic,
	getAdminAllCompetitions,
	getAdminOneCompetition,
	updateAdminCompetition,
	deleteAdminCompetition,
	getAdminAllOrganizations,
	getAdminOneOrganization,
	updateAdminOrganization,
	deleteAdminOrganization,
};

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
const getAcademicActivities = `${rootLink}api/academic-activities`;
const getAcademicLevels = `${rootLink}api/academic-levels`;

export default instance;
export {
	register,
	login,
	rank,
	createAcademic,
	getAcademicActivities,
	getAcademicLevels,
};

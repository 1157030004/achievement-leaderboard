import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import API, {
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
} from "./utils/api";

const createUserSlice = (set, get) => ({
	users: [],
	rank: {},
	isLoading: true,
	alert: {
		isActive: false,
		type: "",
		message: "",
	},
	setAlert: async () => {
		try {
			set((state) => ({
				alert: {
					isActive: false,
					type: "",
					message: "",
				},
			}));
		} catch (err) {
			set(() => ({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			}));
		}
	},
	getRank: async () => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.get(`${rank}`);
			set({
				rank: res.data,
				isLoading: false,
			});
		} catch (err) {
			set(() => ({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			}));
		}
	},
});

const createAcademicSlice = (set, get) => ({
	academics: [],
	academic: {},
	academicActivities: [],
	academicLevels: [],
	isLoading: false,
	alert: {
		isActive: false,
		type: "",
		message: "",
	},

	getAcademics: async () => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.get(`${getAcademics}`);
			set({
				academics: res.data.data,
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Academic data has been successfully fetched",
				},
			});
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
	getOneAcademic: async (id) => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.get(`${getOneAcademic}/${id}`);
			set({
				academic: res.data,
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Academic data has been successfully fetched",
				},
			});
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
	addAcademic: async (data) => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.post(`${createAcademic}`, {
				title: data.title,
				activity: data.activity,
				level: data.level,
				year: data.year,
				proof: data.proof,
			});
			set((state) => ({
				academics: [...state.academics, res.data],
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Academic data has been successfully added",
				},
			}));
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
	getAcademicActivities: async () => {
		try {
			const res = await API.get(`${getAcademicActivities}`);
			set({ academicActivities: res.data });
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
	getAcademicLevels: async () => {
		try {
			const res = await API.get(`${getAcademicLevels}`);
			set({ academicLevels: res.data });
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
	updateAcademic: async (data) => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.put(`${updateAcademic}/${data.id}`, {
				title: data.title,
				activity: data.activity,
				level: data.level,
				year: data.year,
				proof: data.proof,
			});
			set((state) => ({
				academics: state.academics.map((academic) =>
					academic.id === data.id ? res.data : academic
				),
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Academic data has been successfully updated",
				},
			}));
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
	deleteAcademic: async (id) => {
		try {
			set(() => ({
				isLoading: true,
			}));
			await API.delete(`${deleteAcademic}/${id}`);
			set(() => ({
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Academic data has been successfully deleted",
				},
			}));
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
});

const createCompetitionSlice = (set, get) => ({
	competitions: [],
	competition: {},
	competitionActivities: [],
	competitionLevels: [],
	isLoading: false,
	alert: {
		isActive: false,
		type: "",
		message: "",
	},
	getCompetitions: async () => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.get(`${getCompetitions}`);
			set({
				competitions: res.data.data,
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Competition data has been successfully fetched",
				},
			});
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
	getOneCompetition: async (id) => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.get(`${getOneCompetition}/${id}`);
			set({
				competition: res.data,
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Competition data has been successfully fetched",
				},
			});
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
	addCompetition: async (data) => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.post(`${createCompetition}`, {
				title: data.title,
				activity: data.activity,
				level: data.level,
				year: data.year,
				proof: data.proof,
			});
			set((state) => ({
				competitions: { competitions: res.data },
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Competition data has been successfully added",
				},
			}));
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
	getCompetitionActivities: async () => {
		try {
			const res = await API.get(`${getCompetitionActivities}`);
			set({ competitionActivities: res.data });
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
	getCompetitionLevels: async () => {
		try {
			const res = await API.get(`${getCompetitionLevels}`);
			set({ competitionLevels: res.data });
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
	updateCompetition: async (data) => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.put(`${updateCompetition}/${data.id}`, {
				title: data.title,
				activity: data.activity,
				level: data.level,
				year: data.year,
				proof: data.proof,
			});
			set((state) => ({
				competitions: state.competitions.map((competition) =>
					competition.id === data.id ? res.data : competition
				),
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Competition data has been successfully updated",
				},
			}));
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
	deleteCompetition: async (id) => {
		try {
			set(() => ({
				isLoading: true,
			}));
			await API.delete(`${deleteCompetition}/${id}`);
			set(() => ({
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Competition data has been successfully deleted",
				},
			}));
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
});

const createOrganizationSlice = (set, get) => ({
	organizations: [],
	organization: {},
	organizationActivities: [],
	organizationLevels: [],
	isLoading: false,
	alert: {
		isActive: false,
		type: "",
		message: "",
	},
	getOrganizations: async () => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.get(`${getOrganizations}`);
			set({
				organizations: res.data.data,
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Organization data has been successfully fetched",
				},
			});
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
	getOneOrganization: async (id) => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.get(`${getOneOrganization}/${id}`);
			set({
				organization: res.data,
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Organization data has been successfully fetched",
				},
			});
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
	addOrganization: async (data) => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.post(`${createOrganization}`, {
				title: data.title,
				activity: data.activity,
				level: data.level,
				year: data.year,
				proof: data.proof,
			});
			set((state) => ({
				organizations: { organizations: res.data },
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Organization data has been successfully added",
				},
			}));
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
	getOrganizationActivities: async () => {
		try {
			const res = await API.get(`${getOrganizationActivities}`);
			set({ organizationActivities: res.data });
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
	getOrganizationLevels: async () => {
		try {
			const res = await API.get(`${getOrganizationLevels}`);
			set({ organizationLevels: res.data });
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
	updateOrganization: async (data) => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.put(`${updateOrganization}/${data.id}`, {
				title: data.title,
				activity: data.activity,
				level: data.level,
				year: data.year,
				proof: data.proof,
			});
			set((state) => ({
				organizations: state.organizations.map((organization) =>
					organization.id === data.id ? res.data : organization
				),
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Organization data has been successfully updated",
				},
			}));
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
	deleteOrganization: async (id) => {
		try {
			set(() => ({
				isLoading: true,
			}));
			await API.delete(`${deleteOrganization}/${id}`);
			set(() => ({
				isLoading: false,
			}));
		} catch (err) {
			console.log(err);
		}
	},
});

const createCategorySlice = (set, get) => ({
	category: "",
	addCategory: (category) => {
		set((state) => ({
			category: category,
		}));
	},
});

const createAuthSlice = (set, get) => ({
	user: {
		isAdmin: false,
	},
	isLoggedIn: false,
	error: null,
	isLoading: false,
	alert: {
		isActive: false,
		type: "",
		message: "",
	},
	setAlert: async () => {
		try {
			set((state) => ({
				alert: {
					isActive: false,
					type: "",
					message: "",
				},
			}));
		} catch (err) {
			set(() => ({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			}));
		}
	},
	register: async (data, callback) => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.post(`${register}`, {
				email: data.email,
				name: data.name,
				campus: data.campus,
				password: data.password,
			});
			console.log(res.data);
			localStorage.setItem("token", res.data.token);
			set((state) => ({
				user: res.data,
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Successfully registered",
				},
			}));
			callback();
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
	login: async (data) => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.post(`${login}`, {
				email: data.email,
				password: data.password,
			});
			localStorage.setItem("token", res.data.token);
			set((state) => ({
				user: res.data,
				isLoggedIn: true,
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Successfully logged in",
				},
			}));
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
	logout: async () => {
		try {
			localStorage.removeItem("token");
			set(() => ({
				user: {},
				isLoggedIn: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Successfully logged out",
				},
			}));
		} catch (err) {
			set({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			});
		}
	},
});

const createAdminAcademicSlice = (set, get) => ({
	adminAcademics: [],
	adminAcademic: {},
	isLoading: false,
	alert: {
		isActive: false,
		type: "",
		message: "",
	},
	getAdminAllAcademics: async () => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.get(`${getAdminAllAcademics}`);
			set({
				adminAcademics: res.data.data,
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Successfully fetched all academics",
				},
			});
		} catch (err) {
			set(() => ({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			}));
		}
	},
	getAdminOneAcademic: async (id) => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.get(`${getAdminOneAcademic}/${id}`);
			set({
				adminAcademic: res.data,
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Successfully fetched one academic",
				},
			});
		} catch (err) {
			set(() => ({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			}));
		}
	},
	updateAdminAcademic: async (data) => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.put(`${updateAdminAcademic}/${data.id}`, {
				status: data.status,
				score: data.score,
			});
			set((state) => ({
				adminAcademics: state.adminAcademics.map((adminAcademic) =>
					adminAcademic.id === data.id ? res.data : adminAcademic
				),
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Successfully updated academic",
				},
			}));
		} catch (err) {
			set(() => ({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			}));
		}
	},
});

const createAdminCompetitionSlice = (set, get) => ({
	adminCompetitions: [],
	adminCompetition: {},
	isLoading: false,
	alert: {
		isActive: false,
		type: "",
		message: "",
	},
	getAdminAllCompetitions: async () => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.get(`${getAdminAllCompetitions}`);
			set({
				adminCompetitions: res.data.data,
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Successfully fetched all competitions",
				},
			});
		} catch (err) {
			set(() => ({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			}));
		}
	},
	getAdminOneCompetition: async (id) => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.get(`${getAdminOneCompetition}/${id}`);
			set({
				adminCompetition: res.data,
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Successfully fetched one competition",
				},
			});
		} catch (err) {
			set(() => ({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			}));
		}
	},
	updateAdminCompetition: async (data) => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.put(`${updateAdminCompetition}/${data.id}`, {
				status: data.status,
				score: data.score,
			});
			set((state) => ({
				adminCompetitions: state.adminCompetitions.map((adminCompetition) =>
					adminCompetition.id === data.id ? res.data : adminCompetition
				),
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Successfully updated competition",
				},
			}));
		} catch (err) {
			set(() => ({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			}));
		}
	},
});

const createAdminOrganizationSlice = (set, get) => ({
	adminOrganizations: [],
	adminOrganization: {},
	isLoading: false,
	alert: {
		isActive: false,
		type: "",
		message: "",
	},
	getAdminAllOrganizations: async () => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.get(`${getAdminAllOrganizations}`);
			set({
				adminOrganizations: res.data.data,
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Successfully fetched all organizations",
				},
			});
		} catch (err) {
			set(() => ({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			}));
		}
	},
	getAdminOneOrganization: async (id) => {
		try {
			const res = await API.get(`${getAdminOneOrganization}/${id}`);
			set({
				adminOrganization: res.data,
				alert: {
					isActive: true,
					type: "success",
					message: "Successfully fetched one organization",
				},
			});
		} catch (err) {
			set(() => ({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			}));
		}
	},
	updateAdminOrganization: async (data) => {
		try {
			set(() => ({
				isLoading: true,
			}));
			const res = await API.put(`${updateAdminOrganization}/${data.id}`, {
				status: data.status,
				score: data.score,
			});
			set((state) => ({
				adminOrganizations: state.adminOrganizations.map((adminOrganization) =>
					adminOrganization.id === data.id ? res.data : adminOrganization
				),
				isLoading: false,
				alert: {
					isActive: true,
					type: "success",
					message: "Successfully updated organization",
				},
			}));
		} catch (err) {
			set(() => ({
				alert: {
					isActive: true,
					type: "error",
					message: err.response.data,
				},
			}));
		}
	},
});

let store = (set, get) => ({
	...createUserSlice(set, get),
	...createAcademicSlice(set, get),
	...createCompetitionSlice(set, get),
	...createOrganizationSlice(set, get),
	...createCategorySlice(set, get),
	...createAdminAcademicSlice(set, get),
	...createAdminCompetitionSlice(set, get),
	...createAdminOrganizationSlice(set, get),
});

let authStore = (set, get) => ({
	...createAuthSlice(set, get),
});

store = devtools(store, { name: "achievement" });
authStore = devtools(authStore, { name: "auth" });

authStore = persist(authStore, { name: "auth" });

export const useStore = create(store);
export const useAuthStore = create(authStore);

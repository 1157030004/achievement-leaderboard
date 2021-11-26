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
	getRank: async () => {
		try {
			const res = await API.get(`${rank}`);
			set({ rank: res.data, isLoading: false });
		} catch (err) {
			console.log(err);
		}
	},
});

const createAcademicSlice = (set, get) => ({
	academics: [],
	academic: {},
	academicActivities: [],
	academicLevels: [],
	isLoading: true,
	getAcademics: async () => {
		try {
			const res = await API.get(`${getAcademics}`);
			set({ academics: res.data.data, isLoading: false });
		} catch (err) {
			set({
				academics: {
					...get().academics,
					isLoading: false,
					error: err,
				},
			});
			console.log(err);
		}
	},
	getOneAcademic: async (id) => {
		try {
			const res = await API.get(`${getOneAcademic}/${id}`);
			set({ academic: res.data, isLoading: false });
		} catch (err) {
			set({
				academics: {
					...get().academics,
					isLoading: false,
					error: err,
				},
			});
			console.log(err);
		}
	},
	addAcademic: async (data) => {
		try {
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
			}));
		} catch (err) {
			set({
				academics: {
					...get().academics,
					isLoading: false,
					error: err,
				},
			});
			console.log(err);
		}
	},
	getAcademicActivities: async () => {
		try {
			const res = await API.get(`${getAcademicActivities}`);
			set({ academicActivities: res.data });
		} catch (err) {
			console.log(err);
		}
	},
	getAcademicLevels: async () => {
		try {
			const res = await API.get(`${getAcademicLevels}`);
			set({ academicLevels: res.data });
		} catch (err) {
			console.log(err);
		}
	},
	updateAcademic: async (data) => {
		try {
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
			}));
		} catch (err) {
			set({
				academics: {
					...get().academics,
					isLoading: false,
					error: err,
				},
			});
			console.log(err);
		}
	},
	deleteAcademic: async (id) => {
		try {
			const res = await API.delete(`${deleteAcademic}/${id}`);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	},
});

const createCompetitionSlice = (set, get) => ({
	competitions: [],
	competition: {},
	competitionActivities: [],
	competitionLevels: [],
	isLoading: true,
	getCompetitions: async () => {
		try {
			const res = await API.get(`${getCompetitions}`);
			set({ competitions: res.data.data, isLoading: false });
		} catch (err) {
			set({
				competitions: {
					...get().competitions,
					isLoading: false,
					error: err,
				},
			});
			console.log(err);
		}
	},
	getOneCompetition: async (id) => {
		try {
			const res = await API.get(`${getOneCompetition}/${id}`);
			set({ competition: res.data, isLoading: false });
		} catch (err) {
			set({
				competitions: {
					...get().competitions,
					isLoading: false,
					error: err,
				},
			});
			console.log(err);
		}
	},
	addCompetition: async (data) => {
		console.log(data);
		try {
			const res = await API.post(`${createCompetition}`, {
				title: data.title,
				activity: data.activity,
				level: data.level,
				year: data.year,
				proof: data.proof,
			});
			set((state) => ({
				competitions: { competitions: res.data },
			}));
		} catch (err) {
			set({
				competitions: {
					...get().competitions,
					isLoading: false,
					error: err,
				},
			});
			console.log(err);
		}
	},
	getCompetitionActivities: async () => {
		try {
			const res = await API.get(`${getCompetitionActivities}`);
			set({ competitionActivities: res.data });
		} catch (err) {
			console.log(err);
		}
	},
	getCompetitionLevels: async () => {
		try {
			const res = await API.get(`${getCompetitionLevels}`);
			set({ competitionLevels: res.data });
		} catch (err) {
			console.log(err);
		}
	},
	updateCompetition: async (data) => {
		try {
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
			}));
		} catch (err) {
			set({
				competitions: {
					...get().competitions,
					isLoading: false,
					error: err,
				},
			});
			console.log(err);
		}
	},
	deleteCompetition: async (id) => {
		try {
			const res = await API.delete(`${deleteCompetition}/${id}`);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	},
});

const createOrganizationSlice = (set, get) => ({
	organizations: [],
	organization: {},
	organizationActivities: [],
	organizationLevels: [],
	isLoading: true,
	getOrganizations: async () => {
		try {
			const res = await API.get(`${getOrganizations}`);
			set({ organizations: res.data.data, isLoading: false });
		} catch (err) {
			set({
				organizations: {
					...get().organizations,
					isLoading: false,
					error: err,
				},
			});
			console.log(err);
		}
	},
	getOneOrganization: async (id) => {
		try {
			const res = await API.get(`${getOneOrganization}/${id}`);
			set({ organization: res.data, isLoading: false });
		} catch (err) {
			set({
				organizations: {
					...get().organizations,
					isLoading: false,
					error: err,
				},
			});
			console.log(err);
		}
	},
	addOrganization: async (data) => {
		try {
			const res = await API.post(`${createOrganization}`, {
				title: data.title,
				activity: data.activity,
				level: data.level,
				year: data.year,
				proof: data.proof,
			});
			set((state) => ({
				organizations: { organizations: res.data },
			}));
			console.log(res.data);
		} catch (err) {
			set({
				organizations: {
					...get().organizations,
					isLoading: false,
					error: err,
				},
			});
			console.log(err);
		}
	},
	getOrganizationActivities: async () => {
		try {
			const res = await API.get(`${getOrganizationActivities}`);
			set({ organizationActivities: res.data });
		} catch (err) {
			console.log(err);
		}
	},
	getOrganizationLevels: async () => {
		try {
			const res = await API.get(`${getOrganizationLevels}`);
			set({ organizationLevels: res.data });
		} catch (err) {
			console.log(err);
		}
	},
	updateOrganization: async (data) => {
		try {
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
			}));
		} catch (err) {
			set({
				organizations: {
					...get().organizations,
					isLoading: false,
					error: err,
				},
			});
			console.log(err);
		}
	},
	deleteOrganization: async (id) => {
		try {
			const res = await API.delete(`${deleteOrganization}/${id}`);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	},
});

const createCategorySlice = (set, get) => ({
	category: "academic",
	addCategory: (category) => {
		set((state) => ({
			category: category,
		}));
	},
});

const createAuthSlice = (set, get) => ({
	isLoggedIn: false,
	error: null,
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
			console.log(err);
		}
	},
	register: async (data) => {
		try {
			const res = await API.post(`${register}`, {
				email: data.email,
				name: data.name,
				campus: data.campus,
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
					message: "Successfully registered",
				},
			}));
		} catch (err) {
			set({
				user: {
					...get().user,
					isLoading: false,
					error: err.response.data.message,
					alert: {
						isActive: true,
						type: "error",
						message: err.response.data.message,
					},
				},
			});
		}
	},
	login: async (data) => {
		try {
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
	getAdminAllAcademics: async () => {
		try {
			const res = await API.get(`${getAdminAllAcademics}`);
			set({ adminAcademics: res.data.data, isLoading: false });
		} catch (err) {
			set({
				adminAcademics: {
					...get().adminAcademics,
					isLoading: false,
					error: err,
				},
			});
			console.log(err);
		}
	},
	getAdminOneAcademic: async (id) => {
		try {
			const res = await API.get(`${getAdminOneAcademic}/${id}`);
			set({ adminAcademic: res.data, isLoading: false });
		} catch (err) {
			set({
				adminAcademic: {
					...get().adminAcademic,
					isLoading: false,
					error: err,
				},
			});
			console.log(err);
		}
	},
	updateAdminAcademic: async (data) => {
		try {
			const res = await API.put(`${updateAdminAcademic}/${data.id}`, {
				status: data.status,
				score: data.score,
			});
			set((state) => ({
				adminAcademics: state.adminAcademics.map((adminAcademic) =>
					adminAcademic.id === data.id ? res.data : adminAcademic
				),
				isLoading: false,
			}));
		} catch (err) {
			set({
				adminAcademics: {
					...get().adminAcademics,
					isLoading: false,
					error: err,
				},
			});
			console.log(err);
		}
	},
});

const createAdminCompetitionSlice = (set, get) => ({
	adminCompetitions: [],
	adminCompetition: {},
	isLoading: false,
	getAdminAllCompetitions: async () => {
		try {
			const res = await API.get(`${getAdminAllCompetitions}`);
			set({ adminCompetitions: res.data.data, isLoading: false });
		} catch (err) {
			set({
				adminCompetitions: {
					...get().adminCompetitions,
					isLoading: false,
					error: err,
				},
			});
			console.log(err);
		}
	},
	getAdminOneCompetition: async (id) => {
		try {
			const res = await API.get(`${getAdminOneCompetition}/${id}`);
			set({ adminCompetition: res.data, isLoading: false });
		} catch (err) {
			set({
				adminCompetition: {
					...get().adminCompetition,
					isLoading: false,
					error: err,
				},
			});
			console.log(err);
		}
	},
	updateAdminCompetition: async (data) => {
		try {
			const res = await API.put(`${updateAdminCompetition}/${data.id}`, {
				status: data.status,
				score: data.score,
			});
			set((state) => ({
				adminCompetitions: state.adminCompetitions.map((adminCompetition) =>
					adminCompetition.id === data.id ? res.data : adminCompetition
				),
				isLoading: false,
			}));
		} catch (err) {
			set({
				adminCompetitions: {
					...get().adminCompetitions,
					isLoading: false,
					error: err,
				},
			});
			console.log(err);
		}
	},
});

const createAdminOrganizationSlice = (set, get) => ({
	adminOrganizations: [],
	adminOrganization: {},
	isLoading: false,
	getAdminAllOrganizations: async () => {
		try {
			const res = await API.get(`${getAdminAllOrganizations}`);
			set({ adminOrganizations: res.data.data, isLoading: false });
		} catch (err) {
			set({
				adminOrganizations: {
					...get().adminOrganizations,
					isLoading: false,
					error: err,
				},
			});
			console.log(err);
		}
	},
	getAdminOneOrganization: async (id) => {
		try {
			const res = await API.get(`${getAdminOneOrganization}/${id}`);
			set({ adminOrganization: res.data, isLoading: false });
		} catch (err) {
			set({
				adminOrganization: {
					...get().adminOrganization,
					isLoading: false,
					error: err,
				},
			});
			console.log(err);
		}
	},
	updateAdminOrganization: async (data) => {
		try {
			const res = await API.put(`${updateAdminOrganization}/${data.id}`, {
				status: data.status,
				score: data.score,
			});
			set((state) => ({
				adminOrganizations: state.adminOrganizations.map((adminOrganization) =>
					adminOrganization.id === data.id ? res.data : adminOrganization
				),
				isLoading: false,
			}));
		} catch (err) {
			set({
				adminOrganizations: {
					...get().adminOrganizations,
					isLoading: false,
					error: err,
				},
			});
			console.log(err);
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

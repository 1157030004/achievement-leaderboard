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
			console.log(res.data);
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
	user: {
		isLoggedIn: false,
	},
	register: async (data) => {
		try {
			const res = await API.post(`${register}`, {
				name: data.name,
				email: data.email,
				gpa: data.gpa,
				campus: data.campus,
				password: data.password,
			});
			res.data.isLoggedIn = true;
			localStorage.setItem("token", res.data.token);
			set((state) => ({
				...state.user,
				user: res.data,
			}));
		} catch (err) {
			set({
				user: {
					...get().user,
					isLoading: false,
					error: err.response.data.message,
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
				user: {
					...state.user,
					isLoggedIn: true,
				},
			}));
		} catch (err) {
			set({
				user: {
					...get().user,
					isLoading: false,
					error: err,
				},
			});
		}
	},
	logout: async () => {
		try {
			set(() => ({
				user: {
					isLoggedIn: false,
				},
			}));
		} catch (err) {
			set({
				user: {
					...get().user,
					isLoading: false,
					error: err.response.data.message,
				},
			});
		}
	},
});

let store = (set, get) => ({
	...createUserSlice(set, get),
	...createAcademicSlice(set, get),
	...createCompetitionSlice(set, get),
	...createOrganizationSlice(set, get),
	...createCategorySlice(set, get),
});

let authStore = (set, get) => ({
	...createAuthSlice(set, get),
});

store = devtools(store, { name: "achievement" });
authStore = devtools(authStore, { name: "auth" });

authStore = persist(authStore, { name: "auth" });

export const useStore = create(store);
export const useAuthStore = create(authStore);

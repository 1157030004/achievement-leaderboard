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
} from "./utils/api";

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

const createUserSlice = (set, get) => ({
	users: [],
	rank: {},
	getRank: async () => {
		try {
			const res = await API.get(`${rank}`);
			set({ rank: res.data });
		} catch (err) {
			console.log(err);
		}
	},
});

const createAcademicSlice = (set, get) => ({
	academics: [],
	academicActivities: [],
	academicLevels: [],
	getAcademics: async () => {
		try {
			const res = await API.get(`${getAcademics}`);
			console.log(res.data);
			set({ academics: res.data });
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
			set({ academics: res.data });
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
				academics: { academics: res.data },
			}));
			console.log(data.proof);
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
	deleteAcademic: (id) => {
		console.log(id);
		// set((state) => ({
		// 	academics: state.academics.filter((academic) => academic.id !== id),
		// }));
	},
});

const createCompetitionSlice = (set, get) => ({
	competitions: [],
	competitionActivities: [],
	competitionLevels: [],
	getCompetitions: async () => {
		try {
			const res = await API.get(`${getCompetitions}`);
			set({ competitions: res.data });
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
			set({ competitions: res.data });
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
	deleteCompetition: (id) => {
		console.log(id);
		// set((state) => ({
		// 	competitions: state.competitions.filter(
		// 		(competition) => competition.id !== id
		// 	),
		// }));
	},
});

const createOrganizationSlice = (set, get) => ({
	organizations: [],
	organizationActivities: [],
	organizationLevels: [],
	getOrganizations: async () => {
		try {
			const res = await API.get(`${getOrganizations}`);
			set({ organizations: res.data });
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
			set({ organizations: res.data });
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
		console.log(data);
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
});

const createCategorySlice = (set, get) => ({
	category: "",
	addCategory: (category) => {
		set((state) => ({
			category: category,
		}));
	},
});

let store = (set, get) => ({
	...createAuthSlice(set, get),
	...createUserSlice(set, get),
	...createAcademicSlice(set, get),
	...createCompetitionSlice(set, get),
	...createOrganizationSlice(set, get),
	...createCategorySlice(set, get),
});

store = persist(store, { name: "user_settings" });
store = devtools(store);

const useStore = create(store);

export default useStore;

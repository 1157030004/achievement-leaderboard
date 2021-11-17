import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import API, {
	register,
	login,
	rank,
	createAcademic,
	getAcademicActivities,
	getAcademicLevels,
	createCompetition,
	getCompetitionActivities,
	getCompetitionLevels,
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
		set((state) => ({
			academics: state.academics.filter((academic) => academic.id !== id),
		}));
	},
});

const createCompetitionSlice = (set, get) => ({
	competitions: [],
	competitionActivities: [],
	competitionLevels: [],
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
		set((state) => ({
			competitions: state.competitions.filter(
				(competition) => competition.id !== id
			),
		}));
	},
});

const createOrganizationSlice = (set, get) => ({
	organizations: [],
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

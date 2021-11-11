module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			nunito: ["Nunito", "sans-serif"],
			ibm: ["IBM Plex Sans Arabic", "sans-serif"],
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [require("daisyui")],
};

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
	daisyui: {
		themes: [
			{
				"bmka-theme": {
					/* your theme name */ primary: "#2DA5D8" /* Primary color */,
					"primary-focus": "#1F99CC" /* Primary color - focused */,
					"primary-content":
						"#ffffff" /* Foreground content color to use on primary color */,

					secondary: "#FA8A57" /* Secondary color */,
					"secondary-focus": "#ff7b40" /* Secondary color - focused */,
					"secondary-content":
						"#ffffff" /* Foreground content color to use on secondary color */,

					accent: "#312E4F" /* Accent color */,
					"accent-focus": "#25223c" /* Accent color - focused */,
					"accent-content":
						"#ffffff" /* Foreground content color to use on accent color */,

					neutral: "#3d4451" /* Neutral color */,
					"neutral-focus": "#2a2e37" /* Neutral color - focused */,
					"neutral-content":
						"#ffffff" /* Foreground content color to use on neutral color */,

					"base-100":
						"#ffffff" /* Base color of page, used for blank backgrounds */,
					"base-200": "#f9fafb" /* Base color, a little darker */,
					"base-300": "#d1d5db" /* Base color, even more darker */,
					"base-content":
						"#1f2937" /* Foreground content color to use on base color */,

					info: "#2094f3" /* Info */,
					success: "#009485" /* Success */,
					warning: "#ff9900" /* Warning */,
					error: "#ff5724" /* Error */,
				},
			},
		],
	},
};

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'full-white': '#FFFFFF',
				'dark-white': '#FAFAFA',
				'light-blue': '#0095F6',
			},
		},
	},
	plugins: [],
};

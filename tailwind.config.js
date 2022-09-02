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
				'dark-light': '#242526',
				'dark-dark': '#18191A',
				'dark-border': '#393A3B',
			},
		},
	},
	plugins: [require('tailwind-scrollbar')],
};

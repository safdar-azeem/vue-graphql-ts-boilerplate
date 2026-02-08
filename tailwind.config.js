/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
		'./node_modules/vlite3/**/*.{vue,js,ts,jsx,tsx}', // Ensure vlite3 components are scanned
	],
	theme: {
		extend: {},
	},
	plugins: [],
}

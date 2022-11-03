import { theme } from "@chakra-ui/theme";

const gray = {
	900: "#0a0d0f",
	800: "#14191f",
	700: "#181e25",
	600: "#1e262e",
	500: "#28323e",
	400: "#323f4d",
	300: "#3c4b5d",
	200: "#47586c",
	100: "#51657b",
	50: "#5b718b",
};

const text = {
	900: "#7C8093",
	800: "#888CA0",
	700: "#9195AA",
	600: "#999DB4",
	500: "#A1A5BC",
	400: "#AAAEC5",
	300: "#B4B9D1",
	200: "#BCC1DA",
	100: "#C4C9E3",
	50: "#D2D7F1",
};

const accent = {
	900: "#031615",
	800: "#062d29",
	700: "#0a433e",
	600: "#0d5953",
	500: "#107068",
	400: "#13867c",
	300: "#169c91",
	200: "#19b3a6",
	100: "#1dc9ba",
	50: "#20dfcf",
	main: "#37e2d5",
};

export const colors = {
	body: gray[800],
	accent,
	gray,
	border: gray[400],
	text: {
		...text,
		inactive: text[900],
		main: text[50],
	},
	error: theme.colors.red[400],
};

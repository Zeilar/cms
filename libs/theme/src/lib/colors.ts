import { theme } from "@chakra-ui/theme";

const gray = {
	900: "#101023",
	800: "#121221",
	700: "#14141F",
	600: "#12121C",
	500: "#111118",
	400: "#16161D",
	300: "#19191F",
	200: "#1C1C21",
	100: "#1F1F23",
	50: "#262627",
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

export const colors = {
	body: "black",
	accent: theme.colors.green[300],
	gray,
	border: "#3E3E56",
	text: {
		...text,
		inactive: text[900],
		main: text[100],
	},
};

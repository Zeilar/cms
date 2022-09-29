import { theme } from "@chakra-ui/theme";

const gray = {
	900: "#0E0F13",
	800: "#17181F",
	700: "#21232E",
	600: "#292B39",
	500: "#303345",
	400: "#35384B",
	300: "#3A3E54",
	200: "#40455D",
	100: "#484D68",
	50: "#4F5572",
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
	body: gray[900],
	accent: theme.colors.green[400],
	gray,
	text,
};

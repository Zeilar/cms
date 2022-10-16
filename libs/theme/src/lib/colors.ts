import { theme } from "@chakra-ui/theme";

const gray = {
	900: "#08080c",
	800: "#0a0a0f",
	700: "#14141f",
	600: "#1f1f2e",
	500: "#29293d",
	400: "#33334d",
	300: "#3d3d5c",
	200: "#47476b",
	100: "#52527a",
	50: "#5c5c8a",
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
	accent: theme.colors.green[300],
	gray,
	text,
};

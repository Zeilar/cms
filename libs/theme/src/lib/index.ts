import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
// import * as components from "./components";
import { config } from "./config";
import { fonts } from "./fonts";
import { styles } from "./styles";
// import { textStyles } from "./textStyles";

const theme = extendTheme({
	colors,
	config,
	fonts,
	// components: {
	// 	...components, // This needs to be spread into a new object or Chakra's will override ours, I have no idea why
	// },
	styles,
	// textStyles,
});

export default theme;

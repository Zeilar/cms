import { defineStyleConfig } from "@chakra-ui/react";

export const Modal = defineStyleConfig({
	baseStyle: {
		dialog: {
			rounded: "md",
			borderWidth: 2,
			borderColor: "border",
			boxShadow: "md",
			bgGradient: "linear(to-t, gray.600, gray.500)",
			mt: "300px",
		},
		body: {
			pb: 6,
		},
	},
});

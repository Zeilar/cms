import { defineStyleConfig } from "@chakra-ui/react";

export const Modal = defineStyleConfig({
	baseStyle: {
		dialog: {
			rounded: "md",
			borderWidth: 2,
			borderColor: "border",
			boxShadow: "md",
			bgGradient: "linear(to-t, gray.600, gray.500)",
			mt: "150px",
			maxH: "60vh",
			overflowY: "auto",
		},
		body: {
			pb: 6,
		},
	},
});

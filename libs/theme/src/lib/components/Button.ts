import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
	baseStyle: {
		_disabled: {
			pointerEvents: "none",
		},
	},
	variants: {
		outline: {
			color: "accent.main",
			borderColor: "accent.main",
			borderWidth: 2,
			"&:hover, &:active": {
				bgColor: "accent.main",
				color: "gray.900",
			},
		},
	},
	sizes: {
		md: {
			fontSize: "lg",
			py: 6,
		},
	},
});

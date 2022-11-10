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
		link: {
			color: "accent.main",
			textUnderlineOffset: 2,
			fontSize: "md",
			_active: {
				color: "accent.main",
			},
		},
	},
	sizes: {
		sm: {
			fontSize: "md",
			py: 4,
		},
		md: {
			fontSize: "lg",
			py: 5,
		},
	},
});

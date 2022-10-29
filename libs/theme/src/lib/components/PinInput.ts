import { defineStyleConfig } from "@chakra-ui/react";

export const PinInput = defineStyleConfig({
	baseStyle: {
		textTransform: "uppercase",
	},
	variants: {
		outline: {
			borderColor: "border",
			"&:focus-within, &:hover": {
				borderColor: "border",
				bgColor: "gray.600",
			},
			_focusWithin: {
				borderColor: "accent.main",
			},
			_disabled: {
				pointerEvents: "none",
			},
		},
	},
	sizes: {
		xl: {
			py: 2,
			fontSize: "3xl",
		},
	},
});

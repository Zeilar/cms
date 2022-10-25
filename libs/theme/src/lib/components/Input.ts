import { defineStyleConfig } from "@chakra-ui/react";

export const Input = defineStyleConfig({
	baseStyle: {
		field: {
			_placeholder: {
				userSelect: "none",
			},
		},
	},
	variants: {
		filled: {
			field: {
				borderWidth: 2,
				borderColor: "border",
				bgColor: "gray.600",
				"&:hover, &:focus-visible": {
					bgColor: "gray.600",
				},
				_focusVisible: {
					borderColor: "accent.main",
				},
			},
		},
	},
});

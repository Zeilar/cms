import { defineStyleConfig } from "@chakra-ui/react";

export const Input = defineStyleConfig({
	defaultProps: {
		variant: "filled",
	},
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
				bgColor: "transparent",
				"&:hover, &:focus-visible": {
					bgColor: "gray.500",
				},
				"&:disabled:hover": {
					bgColor: "transparent",
				},
				_focusVisible: {
					borderColor: "accent.main",
				},
			},
		},
	},
});

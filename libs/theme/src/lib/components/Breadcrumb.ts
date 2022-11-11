import { defineStyleConfig } from "@chakra-ui/react";

export const Breadcrumb = defineStyleConfig({
	baseStyle: {
		item: {
			color: "text.inactive",
		},
		separator: {
			color: "text.500",
		},
		link: {
			color: "text.500",
			_hover: {
				color: "accent.main",
				textDecor: "none",
			},
		},
	},
});

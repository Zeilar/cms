import { defineStyleConfig } from "@chakra-ui/react";

export const Breadcrumb = defineStyleConfig({
	baseStyle: {
		item: {
			color: "text.500",
		},
		link: {
			_hover: {
				color: "accent.main",
				textDecor: "none",
			},
		},
	},
});

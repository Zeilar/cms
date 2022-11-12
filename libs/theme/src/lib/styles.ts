export const styles = {
	global: {
		body: {
			bgColor: "body",
			bgGradient: "linear(to-t, gray.800, gray.700)",
			color: "text.main",
			h: "100vh",
			overflowX: "hidden",
		},
		"::selection": {
			color: "gray.900",
			bgColor: "accent.main",
		},
		"svg, img": {
			userSelect: "none",
		},
		button: {
			cursor: "pointer",
		},
	},
};

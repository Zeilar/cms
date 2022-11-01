import { FlexProps } from "@chakra-ui/react";
import Col from "../Col";

export default function GradientBox(props: FlexProps) {
	return (
		<Col
			rounded="md"
			borderWidth={2}
			borderColor="border"
			boxShadow="md"
			bgGradient="linear(to-t, gray.700, gray.600)"
			{...props}
		/>
	);
}

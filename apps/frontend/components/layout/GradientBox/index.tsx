import { FlexProps } from "@chakra-ui/react";
import { forwardRef } from "react";
import Col from "../Col";

export default forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
	return (
		<Col
			rounded="md"
			borderWidth={2}
			borderColor="border"
			boxShadow="md"
			bgGradient="linear(to-t, gray.600, gray.500)"
			ref={ref}
			{...props}
		/>
	);
});

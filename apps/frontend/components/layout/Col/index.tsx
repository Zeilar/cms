import { Flex, FlexProps } from "@chakra-ui/react";
import { forwardRef } from "react";

export default forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
	return <Flex ref={ref} flexDir="column" {...props} />;
});

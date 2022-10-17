import { Flex, FlexProps } from "@chakra-ui/react";

export default function Col(props: FlexProps) {
	return <Flex {...props} flexDir="column" />;
}

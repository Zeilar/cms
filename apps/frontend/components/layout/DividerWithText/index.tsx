import { Box, Divider, Flex, Text } from "@chakra-ui/react";

interface Props {
	text: React.ReactNode;
}

export default function DividerWithText({ text }: Props) {
	return (
		<Flex align="center">
			<Divider />
			<Box as="span" p={4}>
				{text}
			</Box>
			<Divider />
		</Flex>
	);
}

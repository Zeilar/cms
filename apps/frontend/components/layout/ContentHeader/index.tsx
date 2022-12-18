import { Divider, Flex, Heading } from "@chakra-ui/react";

interface Props {
	children: React.ReactNode;
	heading: string;
}

export default function ContentHeader({ children, heading }: Props) {
	return (
		<>
			<Flex justify="space-between" align="center">
				<Heading size="lg">{heading}</Heading>
				{children}
			</Flex>
			<Divider my={4} />
		</>
	);
}

import { Box, Flex, Icon, List, ListItem } from "@chakra-ui/react";
import Link from "../Link";
import { ReactComponent as Logo } from "../../assets/svgs/logo.svg";

interface ItemProps {
	children: React.ReactNode;
	href: string;
}

function Item({ children, href }: ItemProps) {
	const rightLineHeight = "35%";
	return (
		<ListItem>
			<Link
				fontSize="xl"
				href={href}
				display="flex"
				px={4}
				py={2}
				pos="relative"
				_hover={{
					textDecor: "none",
					_after: { height: rightLineHeight, transitionDuration: "0.25s" },
				}}
				_after={{
					content: `""`,
					transition: "0.1s",
					rounded: "full",
					pos: "absolute",
					transform: "translateY(-50%)",
					top: "50%",
					right: 0,
					height: 0,
					w: "2px",
					bgColor: "accent",
				}}
				_activeLink={{ color: "red", _hover: {}, _after: { height: rightLineHeight } }}
			>
				{children}
			</Link>
		</ListItem>
	);
}

export default function Sidebar() {
	return (
		<Flex flexDir="column" bgColor="gray.800" w={275} as="nav" h="100vh">
			<Box p={4} bgColor="gray.900">
				<Icon w={200} h="fit-content" as={Logo} />
			</Box>
			<List>
				<Item href="#">Home</Item>
				<Item href="/">Hello</Item>
			</List>
		</Flex>
	);
}

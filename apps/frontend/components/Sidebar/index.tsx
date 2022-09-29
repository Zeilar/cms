import { Flex, Heading, List, ListItem } from "@chakra-ui/react";
import Link from "../Link";
import { ReactComponent as BlackHole } from "../../assets/svgs/black-hole.svg";
import { ReactComponent as Logo } from "../../assets/svgs/logo.svg";
import { brandName } from "@shared";

interface SidebarProps {}

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
		<Flex w={275} as="nav" h="100vh" justifyContent="center" alignItems="center" p={4}>
			<Flex flexDir="column" bgColor="gray.800" w="full" h="full" rounded="lg">
				<Heading
					py={8}
					textAlign="center"
					color="accent"
					zIndex={5}
					size="lg"
					filter="drop-shadow(0 2px 2px black)"
				>
					{brandName}
				</Heading>
				<List>
					<Item href="#">Home</Item>
					<Item href="/">Hello</Item>
				</List>
			</Flex>
		</Flex>
	);
}

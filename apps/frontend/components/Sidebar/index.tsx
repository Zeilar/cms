import { Divider, Flex, Heading, Icon, List, ListItem } from "@chakra-ui/react";
import Link from "../Link";
import { ReactComponent as Logo } from "../../assets/svgs/logo.svg";
import HiddenLink from "../HiddenLink";

interface ItemProps {
	children: React.ReactNode;
	href: string;
}

function Item({ children, href }: ItemProps) {
	const rightLineHeight = "50%";
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
				_activeLink={{
					bgColor: "blackAlpha.400",
					_hover: {},
					_after: { height: rightLineHeight },
				}}
			>
				{children}
			</Link>
		</ListItem>
	);
}

export default function Sidebar() {
	return (
		<Flex flexDir="column" bgColor="gray.700" w={275} as="nav" h="100vh">
			<HiddenLink href="/">
				<Flex p={4}>
					<Icon w={200} h="fit-content" as={Logo} />
				</Flex>
			</HiddenLink>
			<Divider mb={4} />
			<Heading size="xs" color="accent" p={4} textStyle="tinyHeading">
				Spaces
			</Heading>
			<List>
				<Item href="#">Home</Item>
				<Item href="/">Hello</Item>
			</List>
		</Flex>
	);
}

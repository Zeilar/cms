import { Divider, Flex, Heading, Icon, List, ListItem } from "@chakra-ui/react";
import Link from "../Link";
import { ReactComponent as Logo } from "../../assets/svgs/logo.svg";
import UnstyledLink from "../HiddenLink";
import useSWR from "swr";
import { API, ParsedResponse } from "apps/frontend/util/API";
import { SpaceDto } from "@shared";
import useAuthContext from "apps/frontend/hooks/useAuthContext";

interface ItemProps {
	children: React.ReactNode;
	href: string;
}

function Item({ children, href }: ItemProps) {
	const rightLineHeight = "100%";
	return (
		<ListItem>
			<Link
				fontWeight={500}
				href={href}
				display="flex"
				px={4}
				py={2}
				pos="relative"
				color="text.inactive"
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
					bgColor: "accent.main",
				}}
				_activeLink={{
					color: "text.main",
					bgColor: "blackAlpha.500",
					_after: { height: rightLineHeight },
				}}
			>
				{children}
			</Link>
		</ListItem>
	);
}

function fetcher(): Promise<ParsedResponse<SpaceDto[]>> {
	return API.fetch<SpaceDto[]>("space");
}

export default function Sidebar() {
	const { user, isAuthenticated } = useAuthContext();
	const { data } = useSWR("spaces", fetcher);
	return (
		<Flex
			flexDir="column"
			bgGradient="linear(to-t, gray.700, gray.600)"
			boxShadow="md"
			w={300}
			as="nav"
			h="100vh"
			borderRightWidth={1}
			borderRightColor="border"
		>
			<UnstyledLink href="/">
				<Flex py={4} px={2}>
					<Icon w={200} h="fit-content" as={Logo} />
				</Flex>
			</UnstyledLink>
			<Divider mb={4} />
			<Heading size="xs" color="accent.main" px={4} py={2} textStyle="tinyHeading">
				Spaces
			</Heading>
			{Array.isArray(data) && data.length > 0 && (
				<List>
					{data.map(({ id, name }) => (
						<Item key={id} href={`/${id}`}>
							{name}
						</Item>
					))}
				</List>
			)}
			<Divider mt="auto" />
			<Flex>{isAuthenticated && <p>Hello {user?.name}</p>}</Flex>
		</Flex>
	);
}

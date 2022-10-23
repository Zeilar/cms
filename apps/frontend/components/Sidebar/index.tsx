import { Divider, Flex, Heading, Icon, List, ListItem } from "@chakra-ui/react";
import Link from "../Link";
import { ReactComponent as Logo } from "../../assets/svgs/logo.svg";
import UnstyledLink from "../HiddenLink";
import useSWR from "swr";
import { API } from "apps/frontend/util/API";
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
					bgColor: "accent",
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

async function fetcher() {
	return (await API.fetch<SpaceDto[]>("space")).data;
}

export default function Sidebar() {
	const { login } = useAuthContext();
	const { data } = useSWR<SpaceDto[]>("spaces", fetcher);
	return (
		<Flex
			flexDir="column"
			bgColor="gray.800"
			w={300}
			as="nav"
			h="100vh"
			borderRightWidth={1}
			borderRightColor="border"
		>
			<button
				onClick={() =>
					login({
						email: "philip@angelin.dev",
						password: "123",
					})
				}
			>
				login
			</button>
			<UnstyledLink href="/">
				<Flex py={4} px={2}>
					<Icon w={200} h="fit-content" as={Logo} />
				</Flex>
			</UnstyledLink>
			<Divider mb={4} />
			<Heading size="xs" color="accent" px={4} py={2} textStyle="tinyHeading">
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
			<Flex>User stuff</Flex>
		</Flex>
	);
}

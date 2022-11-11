import { Box, Divider, Flex, Heading, Icon } from "@chakra-ui/react";
import { ReactComponent as Logo } from "../../assets/svgs/logo.svg";
import UnstyledLink from "../HiddenLink";
import { API, ParsedResponse } from "apps/frontend/util/API";
import { SpaceDto } from "@shared";
import useAuthContext from "apps/frontend/hooks/useAuthContext";
import useFetch from "apps/frontend/hooks/useFetch";
import HoverList from "../HoverList";
import { useParams } from "apps/frontend/hooks";

function fetcher(): Promise<ParsedResponse<SpaceDto[]>> {
	return API.fetch<SpaceDto[]>("space");
}

export default function Sidebar() {
	const { user, isAuthenticated } = useAuthContext();
	const [spaceName] = useParams("spaceName");
	const { data } = useFetch("spaces", fetcher);
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
			<Flex py={4} px={2} h="56px">
				<UnstyledLink href="/">
					<Icon w="fit-content" h="100%" as={Logo} />
				</UnstyledLink>
			</Flex>
			<Divider mb={4} />
			<Heading size="xs" color="accent.main" px={4} py={2} textStyle="tinyHeading">
				Spaces
			</Heading>
			<Box mx={2}>
				{data && data.length > 0 && (
					<HoverList
						items={data.map(({ name }) => ({
							href: `/space/${name}`,
							label: name,
							active: typeof spaceName === "string" ? spaceName === name : undefined,
						}))}
					/>
				)}
			</Box>
			<Divider mt="auto" />
			<Flex>{isAuthenticated && <p>Hello {user?.name}</p>}</Flex>
		</Flex>
	);
}

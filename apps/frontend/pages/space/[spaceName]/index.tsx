import { API, ParsedResponse } from "apps/frontend/util/API";
import { SpaceDto } from "@shared";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { SpacePageParams } from "apps/frontend/types/params";
import { Box, Container, Heading } from "@chakra-ui/react";
import HoverList from "apps/frontend/components/HoverList";
import Col from "apps/frontend/components/layout/Col";
import { useMemo } from "react";

interface Props {
	result: ParsedResponse<SpaceDto>;
	spaceName: string;
}

function fetcher(spaceName: string): () => Promise<ParsedResponse<SpaceDto>> {
	return () => API.fetch<SpaceDto>(`space/${spaceName}?wct=true`);
}

export default function Page({ result }: Props) {
	const spaceUrl = useMemo(() => `/space/${result.data.name}`, [result.data.name]);
	return (
		<Col grow={1}>
			<Box w="full" borderBottomWidth={1} bgColor="gray.600" p={2}>
				<Container w="full" maxW="container.lg">
					<HoverList
						direction="row"
						items={[
							{ href: spaceUrl, label: "Overview" },
							{ href: `${spaceUrl}/content-types`, label: "Content Types" },
						]}
					/>
				</Container>
			</Box>
			<Container maxW="container.lg">
				<Heading>{result.data.name}</Heading>
			</Container>
		</Col>
	);
}

export async function getServerSideProps({
	params,
}: GetServerSidePropsContext<SpacePageParams>): Promise<GetServerSidePropsResult<Props>> {
	const spaceName = params?.spaceName;
	if (!spaceName) {
		throw new Error("Missing space name");
	}
	const response = await fetcher(spaceName)();
	if (!response.ok) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			result: response,
			spaceName,
		},
	};
}

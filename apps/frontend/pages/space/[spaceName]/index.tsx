import Spinner from "apps/frontend/components/Spinner";
import { API, ParsedResponse } from "apps/frontend/util/API";
import { SpaceDto } from "@shared";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import useSWR from "swr";
import { SpacePageParams } from "apps/frontend/types/params";
import Col from "apps/frontend/components/layout/Col";
import Navbar from "apps/frontend/components/Navbar";
import GradientBox from "apps/frontend/components/layout/GradientBox";
import { Container, Heading } from "@chakra-ui/react";
import useFetch from "apps/frontend/hooks/useFetch";

interface Props {
	result: ParsedResponse<SpaceDto, true>;
	spaceName: string;
}

function fetcher(spaceName: string): () => Promise<ParsedResponse<SpaceDto>> {
	return () => API.fetch<SpaceDto>(`space/${spaceName}?wct=true`);
}

export default function Page({ result, spaceName }: Props) {
	return (
		<Container maxW="container.lg">
			<Heading>{result.data.name}</Heading>
		</Container>
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

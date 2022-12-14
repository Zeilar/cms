import { API, ParsedResponse } from "apps/frontend/util/API";
import { SpaceDto } from "@shared";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { SpacePageParams } from "apps/frontend/types/params";
import { Heading } from "@chakra-ui/react";
import MainContent from "apps/frontend/components/layout/MainContent";
import { useRoutes } from "apps/frontend/hooks";

interface Props {
	result: ParsedResponse<SpaceDto>;
	spaceName: string;
}

function fetcher(spaceName: string): () => Promise<ParsedResponse<SpaceDto>> {
	return () => API.fetch<SpaceDto>(`space/${spaceName}`);
}

export default function Page({ result, spaceName }: Props) {
	const routes = useRoutes(spaceName);
	return (
		<MainContent
			navbarItems={[
				{ href: routes.space(), label: "Overview" },
				{ href: routes.contentTypes(), label: "Content Types" },
			]}
		>
			<Heading>{result.data.name}</Heading>
		</MainContent>
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

	if (response.status === 404) {
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

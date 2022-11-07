import { API, ParsedResponse } from "apps/frontend/util/API";
import { SpaceDto } from "@shared";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { SpacePageParams } from "apps/frontend/types/params";
import { Heading } from "@chakra-ui/react";
import { useMemo } from "react";
import MainContent from "apps/frontend/components/layout/MainContent";
import { useParams } from "apps/frontend/hooks/useParams";

interface Props {
	result: ParsedResponse<SpaceDto>;
	spaceName: string;
}

function fetcher(spaceName: string): () => Promise<ParsedResponse<SpaceDto>> {
	return () => API.fetch<SpaceDto>(`space/${spaceName}`);
}

export default function Page({ result }: Props) {
	const [spaceName] = useParams("spaceName");
	const spaceUrl = useMemo(() => `/space/${spaceName}`, [spaceName]);
	return (
		<MainContent
			navbarItems={[
				{ href: spaceUrl, label: "Overview" },
				{ href: `${spaceUrl}/content-types`, label: "Content Types" },
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

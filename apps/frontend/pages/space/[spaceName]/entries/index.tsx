import { API, ParsedResponse } from "apps/frontend/util/API";
import { EntryDto } from "@shared";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { SpacePageParams } from "apps/frontend/types/params";
import { Heading } from "@chakra-ui/react";
import MainContent from "apps/frontend/components/layout/MainContent";
import { useRoutes } from "apps/frontend/hooks";

interface Props {
	result: ParsedResponse<EntryDto[]>;
	spaceName: string;
}

function fetcher(spaceName: string): () => Promise<ParsedResponse<EntryDto[]>> {
	return () => API.fetch<EntryDto[]>("entry", { query: { spaceName } });
}

export default function Page({ result, spaceName }: Props) {
	const routes = useRoutes(spaceName);
	console.log(result);
	return (
		<MainContent
			navbarItems={[
				{ href: routes.space(), label: "Overview" },
				{ href: routes.contentTypes(), label: "Content Types" },
				{ href: routes.entries(), label: "Entries" },
			]}
		>
			{/* <Heading>{}</Heading> */}
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

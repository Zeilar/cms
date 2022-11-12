import { API, ParsedResponse } from "apps/frontend/util/API";
import { ContentTypeDto } from "@shared";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { SpacePageParams } from "apps/frontend/types/params";
import { Button, Divider, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { useMemo } from "react";
import MainContent from "apps/frontend/components/layout/MainContent";
import CreateContentTypeForm from "apps/frontend/components/CreateContentTypeForm";
import { useFetch, useRoutes } from "apps/frontend/hooks/";
import { useSWRConfig } from "swr";
import Link from "apps/frontend/components/Link";
import { AddIcon } from "@chakra-ui/icons";

interface Props {
	result: ParsedResponse<ContentTypeDto[]>;
	spaceName: string;
}

function fetcher(spaceName: string): () => Promise<ParsedResponse<ContentTypeDto[]>> {
	return () => API.fetch<ContentTypeDto[]>("content-type", { query: { spaceName } });
}

export default function Page({ result, spaceName }: Props) {
	const fetcherKey = useMemo(() => `${spaceName}-content-types`, [spaceName]);
	const { mutate } = useSWRConfig();
	const { data } = useFetch<ContentTypeDto[]>(fetcherKey, fetcher(spaceName), {
		initialData: result,
	});
	const createContentTypeForm = useDisclosure();
	const routes = useRoutes(spaceName);

	return (
		<MainContent
			navbarItems={[
				{ href: routes.space(), label: "Overview" },
				{ href: routes.contentTypes(), label: "Content Types", strict: false },
			]}
			breadcrumbs={[{ label: spaceName, href: routes.space() }, { label: "Content Types" }]}
		>
			{typeof spaceName === "string" && (
				<CreateContentTypeForm
					onSubmit={() => mutate(fetcherKey)}
					spaceName={spaceName}
					isOpen={createContentTypeForm.isOpen}
					onClose={createContentTypeForm.onClose}
				/>
			)}
			<Flex justify="space-between" align="center">
				<Heading size="lg">Content Types</Heading>
				<Button
					variant="outline"
					onClick={createContentTypeForm.onOpen}
					leftIcon={<AddIcon w={3} />}
				>
					Add Content Type
				</Button>
			</Flex>
			<Divider my={4} />
			{data?.map(({ name }) => (
				<Link display="block" key={name} href={routes.contentType(name)}>
					{name}
				</Link>
			))}
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

	return response.status === 404
		? { notFound: true }
		: {
				props: {
					result: response,
					spaceName,
				},
		  };
}

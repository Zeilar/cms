import { API, ParsedResponse } from "apps/frontend/util/API";
import { ContentTypeDto } from "@shared";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { SpacePageParams } from "apps/frontend/types/params";
import { Button, Divider, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { useMemo } from "react";
import MainContent from "apps/frontend/components/layout/MainContent";
import { useParams } from "apps/frontend/hooks/useParams";
import CreateContentTypeForm from "apps/frontend/components/CreateContentTypeForm";
import useFetch from "apps/frontend/hooks/useFetch";
import { useSWRConfig } from "swr";
import { AddIcon } from "@chakra-ui/icons";

interface Props {
	result: ParsedResponse<ContentTypeDto[]>;
	spaceName: string;
}

function fetcher(spaceName: string): () => Promise<ParsedResponse<ContentTypeDto[]>> {
	return () => API.fetch<ContentTypeDto[]>("content-type", { query: { spaceName } });
}

export default function Page({ result }: Props) {
	const [spaceName, contentType] = useParams<["spaceName", "contentType"]>(
		"spaceName",
		"contentType"
	);
	const { mutate } = useSWRConfig();
	const { data } = useFetch<ContentTypeDto[]>(`${spaceName}-content-types`, fetcher(spaceName), {
		initialData: result,
	});
	const spaceUrl = useMemo(() => `/space/${spaceName}`, [spaceName]);
	const createContentTypeForm = useDisclosure();

	return (
		<MainContent
			navbarItems={[
				{ href: spaceUrl, label: "Overview" },
				{ href: `${spaceUrl}/content-types`, label: "Content Types", strict: false },
			]}
			breadcrumbs={[
				{ label: spaceName, href: spaceUrl },
				{ label: "Content Types", href: `${spaceUrl}/content-types` },
				{ label: contentType },
			]}
		>
			{typeof spaceName === "string" && (
				<CreateContentTypeForm
					onSubmit={() => mutate(`${spaceName}-content-types`)}
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
					Add Field
				</Button>
			</Flex>
			<Divider my={4} />
			{data?.map(contentType => (
				<p key={Math.random()}>{contentType.name}</p>
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
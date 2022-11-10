import { API, ParsedResponse } from "apps/frontend/util/API";
import { ContentTypeDto } from "@shared";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { SpacePageParams } from "apps/frontend/types/params";
import { Button, Divider, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { useMemo } from "react";
import MainContent from "apps/frontend/components/layout/MainContent";
import { useParams } from "apps/frontend/hooks/useParams";
import CreateContentTypeForm from "apps/frontend/components/CreateContentTypeForm";

interface Props {
	result: ParsedResponse<ContentTypeDto[]>;
	spaceName: string;
}

function fetcher(spaceName: string): () => Promise<ParsedResponse<ContentTypeDto[]>> {
	console.log("yes");
	return () => API.fetch<ContentTypeDto[]>("content-type", { query: { spaceName } });
}

export default function Page({ result }: Props) {
	const [spaceName] = useParams("spaceName");
	const spaceUrl = useMemo(() => `/space/${spaceName}`, [spaceName]);
	const createContentTypeForm = useDisclosure();
	const { data } = result;

	console.log(data);

	return (
		<MainContent
			navbarItems={[
				{ href: spaceUrl, label: "Overview" },
				{ href: `${spaceUrl}/content-types`, label: "Content Types" },
			]}
		>
			{typeof spaceName === "string" && (
				<CreateContentTypeForm
					spaceName={spaceName}
					isOpen={createContentTypeForm.isOpen}
					onClose={createContentTypeForm.onClose}
				/>
			)}
			<Flex justify="space-between" align="center">
				<Heading size="lg">Content Types</Heading>
				<Button variant="outline" onClick={createContentTypeForm.onOpen}>
					Add content type
				</Button>
			</Flex>
			<Divider my={4} />
			{data.map(contentType => (
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

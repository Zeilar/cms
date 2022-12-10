import { API, ParsedResponse } from "apps/frontend/util/API";
import { FieldDto } from "@shared";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ContentTypePageParams } from "apps/frontend/types/params";
import { Button, Divider, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import MainContent from "apps/frontend/components/layout/MainContent";
import { useFetch, useRoutes } from "apps/frontend/hooks";
import { useSWRConfig } from "swr";
import { AddIcon } from "@chakra-ui/icons";
import CreateFieldForm from "apps/frontend/components/CreateFieldForm";

interface Props {
	result: ParsedResponse<FieldDto[]>;
	spaceName: string;
	contentTypeName: string;
}

function fetcher(
	spaceName: string,
	contentTypeName: string
): () => Promise<ParsedResponse<FieldDto[]>> {
	return () => API.fetch<FieldDto[]>("field", { query: { spaceName, contentTypeName } });
}

export default function Page({ result, contentTypeName, spaceName }: Props) {
	const { mutate } = useSWRConfig();
	const routes = useRoutes(spaceName, contentTypeName);
	const { data } = useFetch<FieldDto[]>(routes.fields(), fetcher(spaceName, contentTypeName), {
		initialData: result,
	});
	const createFieldForm = useDisclosure();
	return (
		<MainContent
			navbarItems={[
				{ href: routes.space(), label: "Overview" },
				{ href: routes.contentTypes(), label: "Content Types", strict: false },
				{ href: routes.entries(), label: "Entries", strict: false },
			]}
			breadcrumbs={[
				{ label: spaceName, href: routes.space() },
				{ label: "Content Types", href: routes.contentTypes() },
				{ label: contentTypeName },
			]}
		>
			{typeof spaceName === "string" && (
				<CreateFieldForm
					onSubmit={() => mutate(routes.fields())}
					contentTypeName={contentTypeName}
					isOpen={createFieldForm.isOpen}
					onClose={createFieldForm.onClose}
				/>
			)}
			<Flex justify="space-between" align="center">
				<Heading size="lg">Fields</Heading>
				<Button
					variant="outline"
					onClick={createFieldForm.onOpen}
					leftIcon={<AddIcon w={3} />}
				>
					Add Field
				</Button>
			</Flex>
			<Divider my={4} />
			{data?.map(field => (
				<p key={Math.random()}>{field.name}</p>
			))}
		</MainContent>
	);
}

export async function getServerSideProps({
	params,
}: GetServerSidePropsContext<ContentTypePageParams>): Promise<GetServerSidePropsResult<Props>> {
	const spaceName = params?.spaceName;

	if (typeof spaceName !== "string") {
		throw new Error("Missing space name");
	}

	const contentTypeName = params?.contentTypeName;

	if (typeof contentTypeName !== "string") {
		throw new Error("Missing Content Type name");
	}

	const response = await fetcher(spaceName, contentTypeName)();

	return response.status === 404
		? { notFound: true }
		: {
				props: {
					result: response,
					spaceName,
					contentTypeName,
				},
		  };
}

import { API, ParsedResponse } from "apps/frontend/util/API";
import { EntryDto } from "@shared";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { SpacePageParams } from "apps/frontend/types/params";
import { Button, useDisclosure } from "@chakra-ui/react";
import MainContent from "apps/frontend/components/layout/MainContent";
import { useFetch, useRoutes } from "apps/frontend/hooks";
import ContentHeader from "apps/frontend/components/layout/ContentHeader";
import { AddIcon } from "@chakra-ui/icons";
import CreateEntryForm from "apps/frontend/components/CreateEntryForm";
import { useSWRConfig } from "swr";

interface Props {
	result: ParsedResponse<EntryDto[]>;
	spaceName: string;
}

function fetcher(spaceName: string): () => Promise<ParsedResponse<EntryDto[]>> {
	return () => API.fetch<EntryDto[]>("entry", { query: { spaceName } });
}

export default function Page({ result, spaceName }: Props) {
	const { mutate } = useSWRConfig();
	const routes = useRoutes(spaceName);
	const { data } = useFetch<EntryDto[]>(routes.entries(), fetcher(spaceName), {
		initialData: result,
	});
	const createEntryForm = useDisclosure();
	return (
		<MainContent
			navbarItems={[
				{ href: routes.space(), label: "Overview" },
				{ href: routes.contentTypes(), label: "Content Types" },
				{ href: routes.entries(), label: "Entries" },
			]}
		>
			{typeof spaceName === "string" && (
				<CreateEntryForm
					onSubmit={() => mutate(routes.entries())}
					spaceName={spaceName}
					isOpen={createEntryForm.isOpen}
					onClose={createEntryForm.onClose}
				/>
			)}
			<ContentHeader heading="Entries">
				<Button
					variant="outline"
					onClick={createEntryForm.onOpen}
					leftIcon={<AddIcon w={3} />}
				>
					Add Entry
				</Button>
			</ContentHeader>
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

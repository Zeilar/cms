import Spinner from "apps/frontend/components/Spinner";
import { API, ParsedResponse } from "apps/frontend/util/API";
import { SpaceDto } from "@shared";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import useSWR from "swr";
import { SpacePageParams } from "apps/frontend/types/params";
import Col from "apps/frontend/components/layout/Col";
import Navbar from "apps/frontend/components/Navbar";

interface Props {
	initialData: ParsedResponse<SpaceDto>;
	spaceId: string;
}

function fetcher(spaceId: string): () => Promise<ParsedResponse<SpaceDto>> {
	return () => API.fetch<SpaceDto>(`space/${spaceId}?wct=true`);
}

export default function Page({ initialData, spaceId }: Props) {
	const { data, isValidating } = useSWR(`space-${spaceId}`, fetcher(spaceId), {
		fallbackData: initialData,
	});
	return (
		<Col grow={1}>
			<Navbar
				items={[
					{ href: `/space/${spaceId}`, label: "Overview" },
					{ href: `/space/${spaceId}/content-types`, label: "Content types" },
				]}
			/>
			<p>{data?.data?.name}</p>
			<pre>{JSON.stringify(data?.data?.contentTypes, null, 4)}</pre>
			{isValidating && <Spinner />}
		</Col>
	);
}

export async function getServerSideProps({
	params,
}: GetServerSidePropsContext<SpacePageParams>): Promise<GetServerSidePropsResult<Props>> {
	const spaceId = params?.spaceId;
	if (!spaceId) {
		throw new Error("Missing space id");
	}
	const response = await fetcher(spaceId)();
	return {
		props: {
			initialData: response,
			spaceId,
		},
	};
}

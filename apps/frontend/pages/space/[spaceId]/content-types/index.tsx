import Spinner from "apps/frontend/components/Spinner";
import { API } from "apps/frontend/util/API";
import { SpaceDto } from "@shared";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import useSWR from "swr";
import { SpacePageParams } from "apps/frontend/types/params";
import Col from "apps/frontend/components/layout/Col";
import Navbar from "apps/frontend/components/Navbar";

interface Props {
	initialData: SpaceDto;
	spaceId: string;
}

function fetcher(spaceId: string) {
	return async () => (await API.fetch<SpaceDto>(`space/${spaceId}?wct=true`)).data;
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
			<p>{data?.name}</p>
			<pre>{JSON.stringify(data?.contentTypes, null, 4)}</pre>
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
	const space = await fetcher(spaceId)();
	return {
		props: {
			initialData: space,
			spaceId,
		},
	};
}
